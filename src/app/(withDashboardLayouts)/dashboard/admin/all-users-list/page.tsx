/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, message, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  DeleteOutlined,
  StopOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import {
  getAllUsers,
  deleteUser,
  blockUser,
  makeAdmin,
} from '@/app/Services/Authservices';

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
}

const AllUserTable = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      setUsers(res?.data || []);
    } catch (err) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (
    id: string,
    action: 'delete' | 'block' | 'admin'
  ) => {
    setProcessingId(id);
    try {
      if (action === 'delete') {
        await deleteUser(id);
        message.success('User deleted');
      } else if (action === 'block') {
        await blockUser(id);
        message.success('User blocked');
      } else if (action === 'admin') {
        await makeAdmin(id);
        message.success('User is now an admin');
      }
      fetchUsers();
    } catch (err) {
      message.error('Action failed');
    } finally {
      setProcessingId(null);
    }
  };

  const columns: ColumnsType<IUser> = [
    { title: 'Name', dataIndex: 'name', responsive: ['xs', 'sm', 'md', 'lg'] },
    { title: 'Email', dataIndex: 'email', responsive: ['sm', 'md', 'lg'] },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (role) => <Tag color="blue">{role}</Tag>,
      responsive: ['sm', 'md', 'lg'],
    },
    {
      title: 'Action',
      render: (_, record) => (
        <Space wrap>
          <Tooltip title="Delete">
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              loading={processingId === record._id}
              onClick={() => handleAction(record._id, 'delete')}
            />
          </Tooltip>

          <Tooltip title="Block">
            <Button
              shape="circle"
              icon={<StopOutlined />}
              loading={processingId === record._id}
              onClick={() => handleAction(record._id, 'block')}
            />
          </Tooltip>

          {record.role !== 'admin' && (
            <Tooltip title="Make Admin">
              <Button
                type="primary"
                shape="circle"
                icon={<CrownOutlined />}
                loading={processingId === record._id}
                onClick={() => handleAction(record._id, 'admin')}
              />
            </Tooltip>
          )}
        </Space>
      ),
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow max-w-full overflow-x-auto m-4">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 6, responsive: true }}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default AllUserTable;
