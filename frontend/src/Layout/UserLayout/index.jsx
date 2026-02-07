import Navbar from '@/component/Navbar'
import React from 'react'

export default function UserLayout({children}) {
  return (
    <> 
    <Navbar/>
    {children}</>
   
  )
}
