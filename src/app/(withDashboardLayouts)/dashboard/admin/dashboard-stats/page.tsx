/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Card, Spin, Typography, Select } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  DollarCircleOutlined,
  UserOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { getDashboardStats } from "@/app/Services/DashstatsService";
import Link from "next/link";

const { Title, Text } = Typography;
const { Option } = Select;

const DashboardStats = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const result = await getDashboardStats();
      if (result?.data) {
        setData(result.data);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    if (data?.monthlyRevenue) {
      const filtered = data.monthlyRevenue
        .filter((item: any) => item._id.year === selectedYear)
        .map((item: any) => ({
          name: `${item._id.month}/${item._id.year}`,
          revenue: item.revenue,
        }));
      setFilteredData(filtered);
    }
  }, [selectedYear, data]);

  if (loading)
    return (
      <Spin className="w-full h-[300px] flex justify-center items-center" />
    );

  const availableYears = [
    ...new Set(data?.monthlyRevenue.map((item: any) => item._id.year)),
  ].sort((a, b) => (b as number) - (a as number));

  return (
    <div className="p-6 space-y-8">
      <Title level={2}>📊 Admin Dashboard</Title>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card bordered hoverable className="rounded-2xl shadow-md">
          <DollarCircleOutlined className="text-3xl text-green-600" />
          <Title level={4}>Total Revenue</Title>
          <Text strong>${data.totalRevenue.toFixed(2)}</Text>
        </Card>
        <Card bordered hoverable className="rounded-2xl shadow-md">
          <UserOutlined className="text-3xl text-blue-600" />
          <Title level={4}>Total Users</Title>
          <Text strong>{data.totalUsers}</Text>
        </Card>
        <Card bordered hoverable className="rounded-2xl shadow-md">
          <BookOutlined className="text-3xl text-purple-600" />
          <Title level={4}>Most Booked Tutor</Title>
          <Text strong>{data.mostBookedTutors[0]?.name}</Text>
        </Card>
      </div>

      {/* Filter + Bar Chart */}
      <Card
        title="📈 Monthly Revenue"
        className="rounded-2xl max-w-[600px] !mb-20 shadow-md overflow-x-auto grid  gap-4"
        extra={
          <Select
            defaultValue={selectedYear}
            onChange={(value) => setSelectedYear(value)}
            style={{ width: 120 }}
          >
            {(availableYears as number[]).map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        }
      >
        <div className="pb-2">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#1D7B84" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Top Tutors */}
      <Card title="🏆 Top 5 Booked Tutors" className="
      rounded-2xl shadow-md  max-w-xl mx-auto  mt-12">
        <ul className="space-y-2">
          {data.mostBookedTutors.map((tutor: any, idx: number) => (
         <Link   key={tutor.tutorId} href={`all-tutor/${tutor.tutorId}`}>
            <li
            
              className="flex justify-between border-b pb-1"
            >
              <Text>
                {idx + 1}. {tutor.name}
              </Text>
              <Text type="secondary">{tutor.bookingCount} bookings</Text>
            </li></Link>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default DashboardStats;
