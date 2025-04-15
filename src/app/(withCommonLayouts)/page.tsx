
// import AOS from 'aos';
import HeroHome from '@/component/HomeComponents/HeroHome';
import KeyPoints from '@/component/HomeComponents/KeyPoints';
import 'aos/dist/aos.css';
import React from 'react';

// const HomePage = () => {

const HomePage = () => {
 
  return (
<div className='bg-[#E3E3E5]'>
  <HeroHome></HeroHome>
  <KeyPoints></KeyPoints>
</div>
  )
}

export default HomePage