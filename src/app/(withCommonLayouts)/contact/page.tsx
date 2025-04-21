import PageBanner from '@/component/PageBanner/PageBanner'
import Container from '@/component/Shared/Container/Container'
import SectionTitle from '@/component/Shared/SectionTitle'
import { FacebookIcon,  MailIcon, TwitterIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import ContactImage from '../../../../public/closeup-hand-writing-note-while-phone.jpg';
const ContactPage = () => {
  return (
    <div>

        <PageBanner title="Contact Us" description='Feel Free To React Us In Any PlatFrom'>

        </PageBanner>
      
<Container>
<div className="py-16 px-4 md:px-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
         {/* Right Side - Image */}
         <div className="flex-1">
          <Image
            src={ContactImage}
            alt="Contact Illustration"
            className="rounded-xl shadow-lg object-cover w-full h-full max-h-[400px]"
          />
        </div>
        {/* Left Side - Contact Info */}
        <div className="flex-1 space-y-6">

      <SectionTitle text='Our Social Media' description="Find Us On "></SectionTitle>

          <p className="text-gray-600 text-sm">
            Whether you have a question, suggestion, or just want to say hi — we are here for you.
          </p>

          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-700">
              <FacebookIcon className="text-blue-600" />
              <a href="https://facebook.com" target="_blank" className="hover:underline">Facebook</a>
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <TwitterIcon className="text-sky-500" />
              <a href="https://twitter.com" target="_blank" className="hover:underline">Twitter</a>
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <MailIcon className="text-red-500" />
              <a href="mailto:contact@tutorlink.com" className="hover:underline">contact@tutorlink.com</a>
            </li>
          </ul>
        </div>

       
      </div>
<section className="py-20 w-full">
  <div className="">
    <SectionTitle text='Our Location' description='Meet Us Here'></SectionTitle>
    <div className="flex justify-center">
      <iframe
        className="w-[100vw] h-96 rounded-lg shadow-lg"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5118.195505997598!2d91.86436317958821!3d24.89420367253672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37505505cb2bcc19%3A0x75736700e5abc9ab!2sWest%20World%20Shopping%20City!5e0!3m2!1sen!2sbd!4v1729348102246!5m2!1sen!2sbd"
        
        loading="lazy"
        title="Google Maps - West World Shopping City"
      ></iframe>
    </div>
  </div>
</section>
</Container>
        
    </div>
  )
}

export default ContactPage