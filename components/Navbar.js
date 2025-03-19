"use client"
import React, { useState } from 'react'
import './Navbar.css'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

const Navbar = () => {
    const { data: session } = useSession()
    const [showdropdown, setShowdropdown] = useState(false)

    return (
        <nav className='bg-gray-900  flex justify-between items-center px-10 h-14 items-center'>
            <Link href={"/"} className="logo font-bold text-2xl">
                <span className='text-white'>
                    Get Me A Juice
                </span>
            </Link>
            {/* <ul className='flex justify-between gap-10'>
                <li>Home</li>
                <li>About</li>
                <li>Projects</li>
                <li>Sign Up</li>
                <li>Login</li>
            </ul> */}

            <div className='flex gap-0 relative'>
                <div className="relative">
                    {session && <> <button onClick={() => { setShowdropdown(!showdropdown) }} onBlur={() => {
                        setTimeout(() => {
                            setShowdropdown(false)
                        }, 100)
                    }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white left-5 relative bg-transparent hover:bg-transparent focus:outline-none font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center" type="button">{session.user.email} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                        <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} bg-white divide-y divide-gray-100 absolute left-[90px] top-[48px] rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                </li>
                                <li>
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
                                </li>
                                <li>
                                    <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                                </li>
                                <li>
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => { signOut() }}>Sign out</Link>
                                </li>
                            </ul>
                        </div>
                    </>
                    }
                </div>
                <div className='flex gap-3'>
                    {!session && <Link href={"/login"}>
                        <button className='w-[80px] h-[35px] login top-3 text-white font-bold'>Log in</button>
                    </Link>}
                    {!session && <Link href={"/signup"}>
                        <button className='w-[80px] h-[35px] signup top-3 text-white font-bold'>Sign up</button> </Link>}
                </div>

            </div>
        </nav >
    )
}

export default Navbar
