"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'

const Dashboard = () => {
  const { data: session } = useSession()
  const router = useRouter()
  
    useEffect(() => {
      if (!session) {
        router.push('/login')
      }
    }, [session, router])

  return (
    <>
    <div className='w-1/2 mx-auto mt-10'>
      <h1 className='text-white text-3xl text-center font-extrabold'>Welcome to your Dashboard</h1>
      <div className='mt-7 flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <span className='text-white font-semibold'>Name</span>
          <input className='rounded-lg bg-slate-700 py-1 px-2 text-white' type="text" />
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-white font-semibold'>Email</span>
          <input className='rounded-lg bg-slate-700 py-1 px-2 text-white' type="text" />
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-white font-semibold'>Username</span>
          <input className='rounded-lg bg-slate-700 py-1 px-2 text-white' type="text" />
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-white font-semibold'>Profile Picture</span>
          <input className='rounded-lg bg-slate-700 py-1 px-2 text-white' type="text" />
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-white font-semibold'>Cover Picture</span>
          <input className='rounded-lg bg-slate-700 py-1 px-2 text-white' type="text" />
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-white font-semibold'>Razorpay Id</span>
          <input className='rounded-lg bg-slate-700 py-1 px-2 text-white' type="text" />
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-white font-semibold'>Razorpay Secret</span>
          <input className='rounded-lg bg-slate-700 py-1 px-2 text-white' type="text" />
        </div>
        <div className='flex flex-col my-2 gap-2'>
          <button className='text-white w-full bg-blue-600 rounded-lg text-center py-2 font-bold hover:bg-blue-800'>Save</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard
