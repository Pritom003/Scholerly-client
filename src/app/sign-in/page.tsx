'use client'


import Container from '@/component/Shared/Container/Container'
import SectionTitle from '@/component/Shared/SectionTitle'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'

  const SignInForm= dynamic(() => import('@/component/SigninForm/FormsignIn'), { ssr: false })

const SignInPage = () => {
  return (
<div className='bg-[#E3E3E5] pt-5 pb-20'>
  <Container>
  <div className="
  ">
    <div className='mt-10 p-6'>
    <SectionTitle
       text="Login to your account" 
       description="Please enter your credentials to continue" 
     />
    </div>
      <Suspense fallback={<div>Loading...</div>}>
      <SignInForm/>
      </Suspense>
    </div>
  </Container>
</div>
  )
}

export default SignInPage
