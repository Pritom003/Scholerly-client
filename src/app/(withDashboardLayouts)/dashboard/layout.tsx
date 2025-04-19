import DashboardWrapper from '@/component/dashboard/dashboard.wrapper'
import React from 'react'

const dashbordlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div> <DashboardWrapper>{children}</DashboardWrapper>;</div>
  )
}

export default dashbordlayout