'use client'

import { useEffect } from 'react'
import 'aos/dist/aos.css' // ✅ CSS is fine to import globally

const AosInitializer = () => {
  useEffect(() => {
    // ✅ Dynamically import AOS inside useEffect to avoid SSR issues
    import('aos').then(AOS => {
      AOS.init({
        duration: 800,
        once: false,
        offset: 100,
        easing: 'ease-in-out',
      })

      const handleScroll = () => {
        AOS.refresh()
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    })
  }, [])

  return null
}

export default AosInitializer
