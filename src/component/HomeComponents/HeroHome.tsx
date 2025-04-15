import React from 'react'
import { Card, Input, Rate } from 'antd'
import { PhoneOutlined, MailOutlined, SearchOutlined } from '@ant-design/icons'
import Image from 'next/image'
import heroImage from '../../../public/hero-katrina.jpg' // replace wi1th your actual image path

const HeroHome = () => {
  return (
    <div className="w-full bg-white h-[1900px] ">
      {/* Top Section: Title + Contact Card */}
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between items-start gap-10 pt-12 pb-8">
        {/* Left: Title + Description */}
        <div className="flex-1 space-y-5 "
         data-aos="fade-right"
         data-aos-duration="1200" 
          // data-aos-easing="ease-in-out"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Scholerly</h1>
          <p className="text-3xl font-semibold leading-snug text-gray-700">
            Expert tutors<br />
            at your fingertips.
          </p>
          <p className="text-gray-600 text-base md:text-lg">
            Find the perfect tutor for your learning journey. Whether you’re looking for math help,
            language learning, or coding lessons — we’ve got you covered.
          </p>
        </div>

        {/* Right: Contact Card */}
        <div className="relative z-10 md:w-[350px] w-full  hidden md:grid" 
         data-aos="fade-left"
        data-aos-duration="1200" >
          <Card className="shadow-lg">
            <div className="space-y-2">
              <p className="text-gray-700 font-medium">⭐ Trusted by 10k+ students</p>
              <Rate disabled defaultValue={5} />
              <hr />
              <div className="space-y-1 pt-2">
                <p className="flex items-center gap-2 text-gray-800">
                  <PhoneOutlined /> +123 456 7890
                </p>
                <p className="flex items-center gap-2 text-gray-800">
                  <MailOutlined /> contact@scholerly.com
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

{/* Background Section with Scroll Reveal Effect */}
<div data-aos="fade-up"
     data-aos-duration="2000" className="relative h-[500px] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src={heroImage}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />

        {/* Overlay: Search Bar in Center */}
        <div className="absolute inset-0 flex justify-center items-center z-20">
          <div className="w-[90%] md:w-1/2">
            <Input
              size="large"
              placeholder="Search for tutors, subjects, or topics..."
              prefix={<SearchOutlined />}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Mobile Card Overlay */}
        <div data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="300"
     data-aos-offset="0"
      className="md:hidden absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] z-30">
          <Card  className="shadow-xl">
            <div className="space-y-2">
              <p className="text-gray-700 font-medium">⭐ Trusted by 10k+ students</p>
              <Rate disabled defaultValue={5} />
              <hr />
              <div className="space-y-1 pt-2">
                <p className="flex items-center gap-2 text-gray-800">
                  <PhoneOutlined /> +123 456 7890
                </p>
                <p className="flex items-center gap-2 text-gray-800">
                  <MailOutlined /> contact@scholerly.com
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default HeroHome
