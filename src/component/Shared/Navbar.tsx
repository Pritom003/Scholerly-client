/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dropdown} from 'antd'
import {  MenuOutlined } from '@ant-design/icons'
import Logo from '../../../public/logo-2withbg.png'
import NotificationBell from '../Notification/NotificationBell'
// adjust the path as needed
import { deleteCookie } from 'cookies-next' 

import { useUser } from '@/context/useContext'

const pages = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'All Tutors', href: '/all-tutor' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog-page' },
  
]

const Navbar = () => {
  const pathname = usePathname()


const {user ,setUser ,isLoading }=useUser()
// console.log(user);
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
        <div className="hidden md:flex gap-4 items-center space-x-4 text-black">
          <NotificationBell />
{
  isLoading ? ".." :(
    user && !isLoading ? (
      <Dropdown
        trigger={['hover']}
        menu={{
          items: [
            {
              key: 'logout',
              label: <span onClick={handleLogout}>Logout</span>,
            },
          ],
        }}
      >
        <div className="cursor-pointer">
          <Image
            src={user?.image || 'https://res.cloudinary.com/dkal4qazy/image/upload/v1744812682/profile_1744812678684.png'}
            alt="User Avatar"
            width={60}
            height={100}
            className="!rounded-full border-2  !w-8 !h-8
             border-[#815606]"
          />
        </div>
      </Dropdown>
    ) : ''
  )
}
        </div>

        {/* Right: Nav Links */}
        <div className="hidden md:flex items-center space-x-4">
         
          {pages.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`relative text-base font-medium transition-all duration-200
                ${pathname === href ? 'text-[#815606]' : 'text-gray-800'}
                hover:text-[#815606]
                after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#815606] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left`}
            >
              {label}
            </Link>
            
          ))}
{
  user?     <Link
  
  href='/dashboard/profile'
  className={`relative text-base font-medium transition-all duration-200
  
    hover:text-[#815606]
    after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#815606] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left`}
>
Dashboard
</Link>:  <Link
        href="/sign-in"
        className={`relative text-base font-medium transition-all duration-200
    
          hover:text-[#815606]
          after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#815606] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left`}
      >
        Login
      </Link>
}

        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden flex items-center space-x-4">
        <div className="flex items-center gap-4 space-x-4 text-black">
          <NotificationBell />
{
  isLoading? ".." :(
    user && !isLoading ? (
      <Dropdown
        trigger={['hover']}
        menu={{
          items: [
            {
              key: 'logout',
              label: <span onClick={handleLogout}>Logout</span>,
            },
          ],
        }}
      >
        <div className="cursor-pointer">
          <Image
            src={user?.image || 'https://res.cloudinary.com/dkal4qazy/image/upload/v1744812682/profile_1744812678684.png'}
            alt="User Avatar"
         height={20}
         width={20}
            className="!rounded-full border-2  !w-8 !h-8
             border-[#815606]"
          />
        </div>
      </Dropdown>
    ) :''
  )
}
        </div>
          <Dropdown
            trigger={['click']}
            menu={{
              items: [
                ...pages.map(({ label, href }) => ({
                  key: href,
                  label: <Link href={href}>{label}</Link>,
                })),
                { type: 'divider' },
               
               
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
