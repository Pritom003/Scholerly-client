
// import AOS from 'aos';
// import HeroHome from '@/component/HomeComponents/HeroHome';
import HeroHome from '@/component/HomeComponents/HeroHome';
import HowScholerlyWorks from '@/component/HomeComponents/HowScholerlyWorks';
import KeyPoints from '@/component/HomeComponents/KeyPoints';
import OurTutors from '@/component/HomeComponents/OurTutors/OurTutor';
import WhatOurUserSay from '@/component/HomeComponents/WhatOurUserSay';
import OurMostLikedBlogs from '@/component/HomeComponents/ourBlogs.tsx/OurBLogs';


import React, { Suspense } from 'react';
import Loading from './loading';


const HomePage = () => {



 
  return (
<div className='bg-[#E3E3E5]'>
<Suspense fallback={<Loading></Loading>}>
        <HeroHome />
      </Suspense>
  <KeyPoints></KeyPoints>
  <HowScholerlyWorks></HowScholerlyWorks>

  <OurTutors></OurTutors>
  <WhatOurUserSay/>
<OurMostLikedBlogs></OurMostLikedBlogs>
</div>
  )
}

export default HomePage