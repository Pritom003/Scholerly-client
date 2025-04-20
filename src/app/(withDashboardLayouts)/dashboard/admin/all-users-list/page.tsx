/* eslint-disable @typescript-eslint/no-unused-vars */
// components/admin/AllUserTable.tsx
'use client'

import { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { blockUser, deleteUser, getAllUsers, makeAdmin } from '@/app/Services/Authservices';
// import { getAllUsers, deleteUser, blockUser, makeAdmin } from '@/services/adminService';

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

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      console.log(res);
      setUsers(res?.data || []);
    } catch (err) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, action: 'delete' | 'block' | 'admin') => {
    try {
      if (action === 'delete') {
       const res= await deleteUser(id);
       console.log(res);
        message.success('User deleted');
      } else if (action === 'block') {
        const res= await blockUser(id);
        console.log(res);
        message.success('User blocked');
      } else if (action === 'admin') {
        const res=  await makeAdmin(id);
        console.log(res);
        message.success('User is now an admin');
      }
      fetchUsers();
    } catch (err) {
      message.error('Action failed');
    }
  };

  const columns: ColumnsType<IUser> = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Role', dataIndex: 'role', render: (role) => <Tag color="blue">{role}</Tag> },
    {
      title: 'Action',
      render: (_, record) => (
        <Space>
          <Button danger onClick={() => handleAction(record._id, 'delete')}>Delete</Button>
          <Button onClick={() => handleAction(record._id, 'block')}>Block</Button>
          {record.role !== 'admin' && (
            <Button type="primary" onClick={() => handleAction(record._id, 'admin')}>Make Admin</Button>
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <Table columns={columns} dataSource={users} rowKey="_id" loading={loading} />
    </div>
  );
};

export default AllUserTable;
