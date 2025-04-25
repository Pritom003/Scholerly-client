'use client'
import dynamic from 'next/dynamic'
import React from 'react'
// import RegisterAsStudent from './RegisterAsStudent'

const StudentSignUP = () => {
    const RegisterAsStudent =dynamic(() => import('./RegisterAsStudent'), { ssr: false })
  return (
    <div><RegisterAsStudent></RegisterAsStudent></div>
  )
}

export default StudentSignUP