"use client"
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import PaymentPage from '@/components/PaymentPage'

const Username = ({ params }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userExists, setUserExists] = useState(false)
  
  useEffect(() => {
    const checkUserExists = async () => {
      if (!params.username) {
        router.push('/404')
        return
      }
      
      try {
        const response = await fetch(`/api/check-user?username=${params.username}`)
        const data = await response.json()
        
        if (!data.exists) {
          router.push('/404')
          return
        }
        
        setUserExists(true)
      } catch (error) {
        console.error("Error checking user:", error)
        router.push('/404')
      } finally {
        setLoading(false)
      }
    }
    
    checkUserExists()
  }, [params.username, router])
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }
  
  if (!userExists) {
    return null // This will never render because we redirect in useEffect
  }

  return (
    <div className={styles.usernamePage}>
      <PaymentPage username={params.username} />
    </div>
  )
}

export default Username
