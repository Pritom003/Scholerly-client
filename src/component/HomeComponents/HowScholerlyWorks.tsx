'use client';
import React from 'react';
import SectionTitle from '../Shared/SectionTitle';
import Container from '../Shared/Container/Container';
// import LottieAnimation from '../Shared/animation/LottieAnimation';
import Button from '@/lib/Buttons/Button';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const HowScholerlyWorks = () => {
  
const LottieAnimation = dynamic
(() => import('../Shared/animation/LottieAnimation'), {
  ssr: false,
});
  const stepsStudent = [
    {
      title: '1 — Register as Student',
      desc: 'Go to the signup page and register as a student.',
    },
    {
      title: '2 — Find Tutor',
      desc: 'Search for tutors based on your subject or location.',
    },
    {
      title: '3 — Send Request',
      desc: 'Request the tutor for a booking session.',
    },
    {
      title: '4 — Pay',
      desc: 'Once accepted, complete the payment to confirm the booking.',
    },
  ];

  const stepsTutor = [
    {
      title: '1 — Register',
      desc: 'Sign up as a tutor and fill in your expertise.',
    },
    {
      title: '2 — Get Approved',
      desc: 'Wait for admin approval to activate your tutor profile.',
    },
    {
      title: '3 — Receive Requests',
      desc: 'Start getting booking requests from students.',
    },
    {
      title: '4 — Get Paid',
      desc: 'After accepting bookings, receive payments accordingly.',
    },
  ];

  return (
    <Container>
      <div className="px-4 md:px-20 py-10 mt-10">
        {/* Title */}
    <div className='grid justify-center align-middle items-center'>
    <div data-aos="fade-left"
    data-aos-duration="2000" className=' max-w-[580px] my-10 '>
        <SectionTitle text="Guideline" description="Let's Know How Scholerly Works " />
        </div>
    </div>

        {/* === Student Section === */}
        <div className="flex flex-col items-center md:items-start md:flex-row gap-8 ">
          {/* Student Icon + Title + Steps */}
          <div className="flex flex-col md:flex-row items-center md:items-start w-full  gap-8">
          <div className='grid gap-2 justify-center items-center align-middle'>
          <LottieAnimation name="student" className="w-1/3 md:w-1/2" />
          <Link href="/signUp/as-student">  <Button buttontext='Sign Up  As Student ' >
           
          </Button> </Link>
                </div>
            <div className="flex flex-col text-left w-full ">
              <h2 className="text-xl font-semibold mb-2">Join as a Student</h2>
              {/* Steps under the icon */}
              <div className="mt-8 space-y-4 grid grid-cols-2 gap-6">
                {stepsStudent.map((step, index) => (
                  <div data-aos="fade-right"
                  data-aos-duration="2000" key={index}>
                    <h3 className="font-bold text-lg">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* === Tutor Section === */}
      
        <div className="flex flex-col items-center md:items-end md:flex-row-reverse gap-8 ">
            
          {/* Tutor Icon + Title + Steps */}
          <div className="flex flex-col md:flex-row-reverse items-center md:items-end w-full  gap-8">
      
            <div className='grid gap-2 justify-center items-center align-middle'>
            <LottieAnimation name="teacher" className="w-1/3 md:w-1/2" />
       <Link href="/signUp/as-tutor">     <Button buttontext='Sign Up As Teacher' ></Button> </Link>
</div>
         <div>
               <div className="flex flex-col text-right w-full ">
               
               <h2 className="text-xl font-semibold mb-2 text-right">Join as a Tutor</h2>
              {/* Steps under the icon */}
              <div className="mt-8  grid grid-cols-2 space-y-4">
              
                {stepsTutor.map((step, index) => (
                  <div data-aos="fade-left"
                  data-aos-duration="2000" key={index}>
                    <h3 className="font-bold text-lg">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>

                ))}
               
              </div>
            </div>
         </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HowScholerlyWorks;
