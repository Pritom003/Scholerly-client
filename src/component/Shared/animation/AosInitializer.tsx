'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const AosInitializer = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false, // Change this to false to allow re-trigger on scroll
      offset: 100,
      easing: 'ease-in-out',
    })

    // Optional: refresh AOS on route change or content update
    const handleScroll = () => {
      AOS.refresh()
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return null
}

export default AosInitializer
