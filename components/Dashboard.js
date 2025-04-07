"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter, useSearchParams } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast, Bounce, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Dashboard = () => {
    const { data: session, update } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})

    useEffect(() => {
        console.log("Session:", session)

        if (!session || !session.user) {
            router.push('/login')
        }
        else {
            getData()
        }
    }, [session, router])

    const getData = async () => {
        try {
          if (!session || !session.user || !session.user.name) {
            console.log("Session data not available yet");
            return;
          }
          
            // Get the provider from the session if available
            const provider = session.user.provider;
            console.log("Fetching user data for:", session.user.name, provider ? `(provider: ${provider})` : '');
            
            // Pass the provider to fetchuser
            let u = await fetchuser(session.user.name, provider);
          
          if (!u) {
            console.log("No user data returned from fetchuser");
            return;
          }
          
          console.log("User data retrieved:", u);
          setform(u);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        if (!session || !session.user || !session.user.name) return;
            
            // Get the provider from the session if available
            const provider = session.user.provider;
            
            // Create FormData from the form state
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value);
                }
            });
            
            console.log("Submitting form data:", Object.fromEntries(formData));
            
            // Pass the provider to updateProfile
            const result = await updateProfile(formData, session.user.name, provider);
            
            if (result.success) {
        toast.success('Profile Updated', {
            position: "bottom-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
        });
                
                // Refresh session and user data
                await update();
                
                // Fetch updated user data
                setTimeout(() => {
                    getData();
                }, 1000);
            } else {
                toast.error(result.error || 'Update failed', {
                    position: "bottom-center",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                });
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error('An error occurred while updating profile', {
                position: "bottom-center",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
        }
    }

    if (!session || !session.user) {
        return <div>Loading...</div>; 
    }

    return (
        <>
            <ToastContainer
                position="bottom-center"
                autoClose={2500}
                hideProgressBar
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="colored"
                transition={Slide}
            />

            <div className='container mx-auto py-4 mt-10 px-6 '>
                <h1 className='text-center my-5 text-[32px] font-bold text-white'>Welcome to your Dashboard</h1>

                {/* Add provider and linked accounts information */}
                <div className="max-w-2xl mx-auto mb-8 p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center mb-4">
                        {form.profilepic && (
                            <div className="mr-4">
                                <img 
                                    src={form.profilepic} 
                                    alt="Profile" 
                                    className="w-[90px] h-[90px] hover:scale-110 hover:transition-all transition-all hover:ease-in-out ease-in-out duration-200 hover:duration-200 rounded-full border-2 border-blue-700 shadow-lg shadow-blue-950"
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-white">{form.name || form.username}</h2>
                            {(form.provider === 'credentials') && <p> </p>}
                            {(form.provider === 'google' || form.provider === 'github') && <p className="text-gray-300 text-lg">
                                Signed in with  <span className="font-semibold">{form.provider || "unknown"}</span>
                            </p>}
                            <p className="text-gray-400 text-base">
                                Email: {form.email || ""}
                            </p>
                        </div>
                        <div>
                            <button 
                                onClick={() => signOut()} 
                                className="px-4 py-2 bg-red-600 duration-200 hover:duration-200 font-extrabold shadow-lg shadow-gray-900 hover:scale-95 ease-in-out hover:ease-out hover:transition-all transition-all text-white rounded hover:bg-red-700"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                    
                    {form.linkedAccounts && form.linkedAccounts.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-white font-semibold mb-2">Linked Accounts:</h3>
                            <div className="space-y-2">
                                {form.linkedAccounts.map((account, index) => (
                                    <div key={index} className="flex items-center p-2 bg-gray-700 rounded">
                                        {account.profilepic && (
                                            <img 
                                                src={account.profilepic} 
                                                alt={`${account.provider} account`}
                                                className="w-8 h-8 rounded-full mr-2"
                                            />
                                        )}
                                        <div>
                                            <p className="text-white">{account.username}</p>
                                            <p className="text-gray-400 text-xs">{account.provider}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>

                    <div className=''>
                        <label htmlFor="name" className="block mb-2 text-lg font-semibold font-medium text-gray-900 dark:text-white">Name</label>
                        <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input for email */}
                    <div className="my-2">
                        <label htmlFor="email" className="block mb-2 text-lg font-semibold font-medium text-gray-900 dark:text-white">Email</label>
                        <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name='email' id="email" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input forusername */}
                    <div className='my-2'>
                        <label htmlFor="username" className="block mb-2 text-lg font-semibold font-medium text-gray-900 dark:text-white">Username</label>
                        <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id="username" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input for profile picture of input type text */}
                    <div className="my-2">
                        <label htmlFor="profilepic" className="block mb-2 text-lg font-semibold font-medium text-gray-900 dark:text-white">Profile Picture</label>
                        <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" name='profilepic' id="profilepic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* input for cover pic  */}
                    <div className="my-2">
                        <label htmlFor="coverpic" className="block mb-2 text-lg font-semibold font-medium text-gray-900 dark:text-white">Cover Picture</label>
                        <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" name='coverpic' id="coverpic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    
                    {/* input for description */}
                    <div className="my-2">
                        <label htmlFor="description" className="block mb-2 text-lg font-semibold font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea value={form.description ? form.description : ""} onChange={handleChange} name='description' id="description" rows="3" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Describe what you create"></textarea>
                    </div>
                    
                    {/* input razorpay id */}
                    <div className="my-2">
                        <label htmlFor="razorpayid" className="block mb-2 text-lg font-semibold font-medium text-gray-900 dark:text-white">Razorpay Id</label>
                        <input value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} type="text" name='razorpayid' id="razorpayid" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input razorpay secret */}
                    <div className="my-2">
                        <label htmlFor="razorpaysecret" className="block mb-2 text-lg font-semibold font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
                        <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} type="text" name='razorpaysecret' id="razorpaysecret" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* Submit Button  */}
                    <div className="my-6">
                        <button type="submit" className="block text-2xl w-full p-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none hover:scale-95 font-extrabold hover:shadow-2xl hover:shadow-gray-900 hover:transition-all transition-all ease-in-out hover:ease-in-out ">Save</button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default Dashboard