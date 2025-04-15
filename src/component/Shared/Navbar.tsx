'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dropdown } from 'antd'
import { ShoppingCartOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons'
import Logo from '../../../public/logo-2withbg.png'

const pages = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'All Tutors', href: '/tutors' },
  { label: 'Bookings', href: '/bookings' },
  { label: 'Contact', href: '/contact' },
]

const Navbar = () => {
  const pathname = usePathname()

  return (
    <header className="w-full  top-0 z-50 bg-[#E3E3E5] ">
      <div className="w-[80%] mx-auto flex items-center justify-between h-16">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image src={Logo} alt="TutorLink Logo" width={50} height={50} priority />
          </Link>
        </div>

        {/* Center: Cart & Profile */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/cart">
            <ShoppingCartOutlined className="text-xl hover:text-blue-500" />
          </Link>
          <Link href="/profile">
            <UserOutlined className="text-xl hover:text-blue-500" />
          </Link>
        </div>

        {/* Right: Nav Links */}
        <div className="hidden md:flex space-x-6">
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
                {
                  type: 'divider',
                },
                {
                  key: 'cart',
                  label: <Link href="/cart">Cart</Link>,
                },
                {
                  key: 'profile',
                  label: <Link href="/profile">Profile</Link>,
                },
              ],
            }}
          >
            <MenuOutlined className="text-xl cursor-pointer" />
          </Dropdown>
        </div>
      
      </div>

    <hr     
        data-aos="fade-left"
        data-aos-duration="1200" className='text-amber-950 w-[90%] mx-auto'/>
    <hr     
        data-aos="fade-right"
        data-aos-duration="1200" className='text-amber-50 w-[90%] mx-auto'/>
 
    </header>
  )
}

export default Navbar
