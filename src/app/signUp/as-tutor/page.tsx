'use client'
import React from 'react'
// import SignUpAsTutor from './SignUpAsTutor'
import dynamic from 'next/dynamic'

const page = () => {

  const SignUpAsTutor =dynamic(() => import('./SignUpAsTutor'), { ssr: false })
  return (
    <div><SignUpAsTutor></SignUpAsTutor></div>
  )
}

export default page