/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dropdown, Button } from 'antd'
import { ShoppingCartOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons'
import Logo from '../../../public/logo-2withbg.png'
import NotificationBell from '../Notification/NotificationBell'
// adjust the path as needed
import { deleteCookie } from 'cookies-next' // use this if you want to handle client-side cookies
import { getCurrentUser } from '@/app/Services/Authservices'

const pages = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'All Tutors', href: '/all-tutor' },
  { label: 'Contact', href: '/contact' },
]

const Navbar = () => {
  const pathname = usePathname()


  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    fetchUser()
  }, [])

  const handleLogout = () => {
    deleteCookie('accessToken')
    deleteCookie('refreshToken')
    setUser(null)
   
  }

  return (
    <header className="w-full top-0 z-50 bg-[#E3E3E5]">
      <div className="w-[80%] mx-auto flex items-center justify-between h-16">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image src={Logo} alt="TutorLink Logo" width={50} height={50} priority />
          </Link>
        </div>

        {/* Center: Cart & Profile */}
        <div className="hidden md:flex items-center space-x-4 text-black">
          <NotificationBell />
          <Link href="/cart">
            <ShoppingCartOutlined className="text-xl hover:text-blue-500" />
          </Link>
          <Link href="/profile">
            <UserOutlined className="text-xl hover:text-blue-500" />
          </Link>
        </div>

        {/* Right: Nav Links */}
        <div className="hidden md:flex items-center space-x-4">
          {pages.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`relative text-base font-medium transition-all duration-200
                ${pathname === href ? 'text-blue-600' : 'text-gray-800'}
                hover:text-blue-600
                after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left`}
            >
              {label}
            </Link>
          ))}

          {user ? (
            <Button onClick={handleLogout} danger>
              Logout
            </Button>
          ) : (
            <Link href="/sign-in">
              <Button type="primary">Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <Dropdown
            trigger={['click']}
            menu={{
              items: [
                ...pages.map(({ label, href }) => ({
                  key: href,
                  label: <Link href={href}>{label}</Link>,
                })),
                { type: 'divider' },
                { key: 'cart', label: <Link href="/cart">Cart</Link> },
                { key: 'profile', label: <Link href="/profile">Profile</Link> },
                { type: 'divider' },
                user
                  ? {
                      key: 'logout',
                      label: <span onClick={handleLogout}>Logout</span>,
                    }
                  : {
                      key: 'signIn',
                      label: <Link href="/sign-in">Login</Link>,
                    },
              ],
            }}
          >
            <MenuOutlined className="text-xl cursor-pointer" />
          </Dropdown>
        </div>
      </div>

      <hr data-aos="fade-left" data-aos-duration="1200" className="text-amber-950 w-[90%] mx-auto" />
      <hr data-aos="fade-right" data-aos-duration="1200" className="text-amber-50 w-[90%] mx-auto" />
    </header>
  )
}

export default Navbar
