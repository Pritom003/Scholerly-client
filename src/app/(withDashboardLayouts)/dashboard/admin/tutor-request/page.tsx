/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  message,
  Modal,
  Spin,
  Table,
  Tag,
} from 'antd';
import { getAllTutors, handleTutorRequest } from '@/app/Services/TutorServices';
import Image from 'next/image';

const TutorRequestPage = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [selectedTutor, setSelectedTutor] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPendingTutors = async () => {
    try {
      setLoading(true);
      const res = await getAllTutors();
      setTutors(Array.isArray(res?.data?.tutors) ? res.data.tutors : []);
    } catch (error) {
      message.error('Failed to fetch tutors');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (id: string, request: 'approved' | 'rejected') => {
    try {
      setProcessingId(id);
      const res = await handleTutorRequest(id, { request });
      if (res?.success) {
        message.success(`Tutor ${request} successfully`);
        fetchPendingTutors(); // Refresh list
      } else {
        message.error(res?.message || 'Operation failed');
      }
    } catch (err) {
      message.error('Something went wrong');
    } finally {
      setProcessingId(null);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_: string, record: any) => (
        <Button type="link" onClick={() => {
          setSelectedTutor(record);
          setIsModalOpen(true);
        }}>
          {record.fullName || record.name}
        </Button>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'request',
      key: 'request',
      render: (status: string) => <Tag color="orange">{status}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <>
        {
            record.request === 'pending' ?  <div>
                 <Button
            danger
            loading={processingId === record._id}
            onClick={() => handleRequest(record._id, 'rejected')}
          >
            Reject
          </Button> <Button
            type="primary"
            loading={processingId === record._id}
            onClick={() => handleRequest(record._id, 'approved')}
            style={{ marginRight: '8px' }}
          >
            Approve
          </Button></div>: record.request === 'approved' ?     <Button
            danger
            loading={processingId === record._id}
            onClick={() => handleRequest(record._id, 'rejected')}
          >
            Reject
          </Button>:<Button
            type="primary"
            loading={processingId === record._id}
            onClick={() => handleRequest(record._id, 'approved')}
            style={{ marginRight: '8px' }}
          >
            Approve
          </Button> 
        }
          
     
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchPendingTutors();
  }, []);

  const renderTutorModal = () => {
    if (!selectedTutor) return null;

    const {
      fullName,
      email,
      phone,
      bio,
      subjects,
      hourlyRate,
      discountRate,
      qualifications,
      availability,
      location,
      rating,
      totalReviews,
      profileImage,
    } = selectedTutor;

    return (
      <Modal
        title="Tutor Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={700}
      >
        <div className="flex gap-4">
       
        
          <div>
          <Image    src={profileImage}
            alt="profile"
           height={100}
           width={80}
           className='rounded-full'
           >

          </Image>
            <h2>{fullName}</h2>
            <p><strong>Email:</strong> {email}</p>
            {phone && <p><strong>Phone:</strong> {phone}</p>}
            {location && <p><strong>Location:</strong> {location}</p>}
            {bio && <p><strong>Bio:</strong> {bio}</p>}
            <p><strong>Subjects:</strong> {subjects?.join(', ')}</p>
            <p><strong>Hourly Rate:</strong> ${hourlyRate}</p>
            {discountRate && <p><strong>Discount Rate:</strong> {discountRate}%</p>}
            <p><strong>Rating:</strong> {rating} ⭐ ({totalReviews} reviews)</p>
            {availability?.length > 0 && (
              <>
                <p><strong>Availability:</strong></p>
                <ul>
                  {availability.map((slot: any, idx: number) => (
                    <li key={idx}>
                      {slot.day}: {slot.from} - {slot.to}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {qualifications?.length > 0 && (
              <>
                <p><strong>Qualifications:</strong></p>
                <ul>
                  {qualifications.map((q: any, idx: number) => (
                    <li key={idx}>
                      {q.degree}, {q.institution} ({q.graduationYear || q.currentYear}) - {q.experience}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <Card title="ALL TUTORS" >
      {loading ? (
        <Spin />
      ) : (
        <>
        <p className='text-sm font-bold text-green-700'>click on the name to see the  details</p>
          <Table
            columns={columns}
            dataSource={tutors}
            rowKey="_id"
          />
          {renderTutorModal()}
        </>
      )}
    </Card>
  );
};

export default TutorRequestPage;
