
// import AOS from 'aos';
import HeroHome from '@/component/HomeComponents/HeroHome';
import HowScholerlyWorks from '@/component/HomeComponents/HowScholerlyWorks';
import KeyPoints from '@/component/HomeComponents/KeyPoints';
import Ourtutors from '@/component/HomeComponents/OurTutors/OurTutor';
import WhatOurUserSay from '@/component/HomeComponents/WhatOurUserSay';
import 'aos/dist/aos.css';
import React from 'react';

// const HomePage = () => {

const HomePage = () => {
 
  return (
<div className='bg-[#E3E3E5]'>
  <HeroHome></HeroHome>
  <KeyPoints></KeyPoints>
  <HowScholerlyWorks></HowScholerlyWorks>
  <Ourtutors></Ourtutors>
  <WhatOurUserSay></WhatOurUserSay>
</div>
  )
}

export default HomePage