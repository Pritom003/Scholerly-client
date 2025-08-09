/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import { Badge, Dropdown, Spin } from 'antd'
import { BellOutlined, ReloadOutlined } from '@ant-design/icons'
import { useUser } from '@/context/useContext'
import {
  getUserNotifications,
  markNotificationAsRead,
} from '@/app/Services/Notificationservice'
import { useRouter } from 'next/navigation'

const NotificationBell = () => {
  const { user } = useUser()
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
// console.log(user?.id,'user id');
  // Fetch notifications from the backend
  const fetchNotifications = async () => {
    if (!user?.id) return
    setLoading(true)
    let data
   if(user?.role==='admin'){
     data = await getUserNotifications(user.role)   
  }else {
   data = await getUserNotifications(user.id.toString())  
  }
    // console.log('Notifications:', data)
    if (data?.success && Array.isArray(data.data)) {
      setNotifications(data.data)
    }
    setLoading(false)
  }

useEffect(() => {
  if (user?.id) {
    fetchNotifications()

    const interval = setInterval(() => {
      fetchNotifications()
    }, 10000)

    return () => clearInterval(interval)
  } else {
    // If the user logs out, clear notifications
    setNotifications([])
  }
}, [user?.id])


  // Handle notification click (mark as read and remove from state)
 // Handle notification click (mark as read and redirect)
const handleNotificationClick = async (id: string, notif: any) => {
  const response = await markNotificationAsRead(id)
  console.log(response, 'response')

  if (response?.success) {
    setNotifications((prev) => prev.filter((n) => n._id !== id))
  } else {
    console.error('Error marking notification as read')
  }

  // Handle redirection based on type and role
  if (notif=== 'booking') {
    if (user?.role === 'tutor' ) {
      router.push('/dashboard/tutor/bookingrqst')
    } else if (user?.role === 'student') {
      router.push('/dashboard/student/booking')
    }
  } else if (user?.role === 'admin'&& notif=== 'approval') {
    router.push('/dashboard/admin/tutor-request') // Default admin dashboard
  }else if (user?.role === 'tutor'&& notif=== 'review' || notif=== 'approval' || notif=== 'blog') {
    router.push(`/all-tutor`) // Default admin dashboard

  }
}

  const notificationItems =
    notifications.length > 0
      ? [
          {
            key: 'refresh',
            label: (
              <div className="flex justify-between items-center text-blue-600">
                <span>Notifications</span>
                <ReloadOutlined
                  onClick={fetchNotifications}
                  className="cursor-pointer"
                />
              </div>
            ),
          },
          ...notifications.map((notif) => ({
            key: notif._id,
            label: (
              <span
                onClick={() => handleNotificationClick(notif._id,notif.type)}
                className="cursor-pointer hover:text-blue-600"
              >
                {notif.message}
              </span>
            ),
          })),
        ]
      : [
          {
            key: 'no-notifications',
            label: (
              <span className="text-gray-400">No notifications</span>
            ),
          },
        ]

  return (
    <Dropdown
      menu={{ items: notificationItems }}
      trigger={['click']}
      placement="bottomRight"
      getPopupContainer={(triggerNode) =>
        triggerNode.parentNode as HTMLElement
      }
    >
      <Badge
        count={notifications.length}
        size="default"
        offset={[-5, 5]}
        color="red"
      >
        {loading ? (
          <Spin size="small">
            <BellOutlined className="text-xl cursor-pointer" />
          </Spin>
        ) : (
          <BellOutlined className="text-xl hover:text-blue-500 cursor-pointer" />
        )}
      </Badge>
    </Dropdown>
  )
}

export default NotificationBell
