"use client"
import React, {useState} from 'react'
import Script from 'next/script'
import { initiate } from '@/actions/useractions'
import { useSession } from 'next-auth/react'


const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({ })
    const handleChange = (e) => {
        console.log(paymentform)
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id

        var options = {
            "key": process.env.KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Juice", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new Razorpay(options);
        rzp1.open();

    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='text-white'>
                {username}
            </div>
            <div className='text-white coverimg flex justify-center items-center flex-col w-full'>
                <img className='object-cover' src="/cover.png" alt="" />
                <div className=" flex justify-center items-center profileimg bottom-[68px] rounded-2xl w-fit relative">
                    <img className='rounded-2xl' width={120} height={130} src="/profile.jpeg" alt="" />
                </div>
                <div className='profilecontent flex flex-col justify-center items-center bottom-[55px] relative gap-2'>
                    <div className='text-white text-[32px]  font-bold'>
                        Hbomb
                    </div>
                    <div className='flex gap-1 flex-col items-center'>
                        <div className='text-[14px] font-[325px]'>
                            Creating Videos and Video Essays
                        </div>
                        <div className='text-[14px] font-[325px] flex gap-2 items-center flex-row text-gray-400'>
                            40,118 members<div className='w-[4px] h-[4px] bg-gray-400 rounded-full '></div>189 Posts
                        </div>
                    </div>
                    <div>
                        <button className='px-20 top-2 relative font-bold text-sm py-3 hover:bg-gray-200 transition-colors bg-white text-black rounded-lg'>Join for free</button>
                    </div>
                </div>
                <div className="payment flex gap-3 w-[80%]">
                    <div className="supporters w-1/2 rounded-lg text-white p-10">
                        <h2 className='text-lg font-bold  my-5'>Supporters</h2>
                        <ul className='mx-5 text-lg'>
                            <li className='my-2 flex gap-3 '>
                                <div className='w-fit p-1 rounded-full overflow-hidden bg-yellow-300'>
                                    <img src="avatar.gif" width={24} alt="" />
                                </div>
                                <span className='flex items-center'>
                                    Shubham donated $30 with a message
                                </span>
                            </li>
                            <li className='my-2 flex gap-3 '>
                                <div className='w-fit p-1 rounded-full overflow-hidden bg-yellow-300'>
                                    <img src="avatar.gif" width={24} alt="" />
                                </div>
                                <span className='flex items-center'>
                                    Shubham donated $30 with a message
                                </span>
                            </li>
                            <li className='my-2 flex gap-3 '>
                                <div className='w-fit p-1 rounded-full overflow-hidden bg-yellow-300'>
                                    <img src="avatar.gif" width={24} alt="" />
                                </div>
                                <span className='flex items-center'>
                                    Shubham donated $30 with a message
                                </span>
                            </li>
                            <li className='my-2 flex gap-3 '>
                                <div className='w-fit p-1 rounded-full overflow-hidden bg-yellow-300'>
                                    <img src="avatar.gif" width={24} alt="" />
                                </div>
                                <span className='flex items-center'>
                                    Shubham donated $30 with a message
                                </span>
                            </li>
                            <li className='my-2 flex gap-3 '>
                                <div className='w-fit p-1 rounded-full overflow-hidden bg-yellow-300'>
                                    <img src="avatar.gif" width={24} alt="" />
                                </div>
                                <span className='flex items-center'>
                                    Shubham donated $30 with a message
                                </span>
                            </li>
                            <li className='my-2 flex gap-3 '>
                                <div className='w-fit p-1 rounded-full overflow-hidden bg-yellow-300'>
                                    <img src="avatar.gif" width={24} alt="" />
                                </div>
                                <span className='flex items-center'>
                                    Shubham donated $30 with a message
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="makepayment w-1/2 rounded-lg text-white p-4">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className="flex gap-2 flex-col items-center">
                            <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg' placeholder='Enter Name' />
                            <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg' placeholder='Enter Message' />
                            <input onChange={handleChange}
                                value={paymentform.amount} name='amount' type="text" className='w-full p-3 rounded-lg' placeholder='Enter Amount' />
                            <button className='w-1/2 p-2 mt-3 font-extrabold '>Pay</button>
                        </div>
                        {/* or choose from these other amounts */}
                        <div className='flex gap-5 mt-7 w-full'>
                            <button className='w-[30%] p-2 font-bold' onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className='w-[30%] p-2 font-bold' onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className='w-[30%] p-2 font-bold' onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage