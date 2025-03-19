"use client"
import React from 'react'
import './page.css'
import PaymentPage from '@/components/PaymentPage'

const Username = ({ params }) => {
  return (
    <>
      <PaymentPage username={params.username}/>
    </>
  )
}

export default Username
