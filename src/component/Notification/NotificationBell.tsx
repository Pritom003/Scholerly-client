'use client'

import React, { useEffect, useState } from 'react'
import { Badge, Dropdown } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import socket from '@/utils/socket'
import { useUser } from '@/context/useContext'

const NotificationBell = () => {
  const { user } = useUser()
  const [notifications, setNotifications] = useState<string[]>([])

  useEffect(() => {
    if (!user?.id) return

    socket.emit('joinRoom', user.id)

    socket.on('newBooking', (data) => {
      setNotifications((prev) => [`📩 ${data?.message || 'New booking received!'}`, ...prev])
    })

    socket.on('bookingUpdated', (data) => {
      setNotifications((prev) => [`✅ ${data?.message || 'Booking status updated'}`, ...prev])
    })

    return () => {
      socket.off('newBooking')
      socket.off('bookingUpdated')
    }
  }, [user?.id])

  const notificationItems =
    notifications.length > 0
      ? notifications.map((notif, idx) => ({
          key: idx,
          label: <span>{notif}</span>,
        }))
      : [
          {
            key: 'no-notifications',
            label: <span className="text-gray-400">No notifications</span>,
          },
        ]

  return (
    <Dropdown
      menu={{ items: notificationItems }}
      trigger={['click']}
      placement="bottomRight"
      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
    >
      <Badge count={notifications.length} size="small" offset={[0, 0]}>
        <BellOutlined className="text-xl hover:text-blue-500 cursor-pointer" />
      </Badge>
    </Dropdown>
  )
}

export default NotificationBell
