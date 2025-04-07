"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { initiate, fetchpayments, fetchuser } from '@/actions/useractions'
import { ToastContainer, toast, Bounce, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'




const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()

    useEffect(() => {
        getData()
    }, [username])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast.success('Payment Completed', {
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


    }, [])


    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        try {
            let u = await fetchuser(username)
            if (!u) {
                console.error("User not found:", username);
                return;
            }
            console.log("User data loaded:", u);
            setcurrentUser(u)

            let dbpayments = await fetchpayments(username)
            console.log("Payments loaded:", dbpayments);
            setPayments(dbpayments)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id

        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Juice", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
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
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div className='text-white coverimg flex justify-center items-center mt-[65px] flex-col w-fit'>
                <img className='object-cover w-full h-fit' src={currentUser?.coverpic || "/cover.png"} alt="" />
                <div className="profileimg flex justify-center items-center bottom-[68px] rounded-2xl w-fit relative">
                    {currentUser?.profilepic ? (
                        <img
                            className='rounded-2xl border-2 border-gray-500 mt-4 object-cover'
                            width={120}
                            height={130}
                            src={currentUser.profilepic}
                            alt={currentUser.name || currentUser.username || ""}
                        />
                    ) : (
                        <img
                            className='rounded-2xl '
                            width={120}
                            height={130}
                            src="/profile.jpeg"
                            alt="Default profile"
                        />
                    )}
                </div>
                <div className='profilecontent flex flex-col justify-center items-center bottom-[55px] relative gap-2'>
                    <div className='text-white text-[32px] font-bold'>
                        {currentUser?.name || username}
                    </div>
                    <div className='flex gap-1 flex-col items-center'>
                        <div className='text-[14px] font-[325px]'>
                            {currentUser?.description || "Creating Videos and Content"}
                        </div>
                        <div className='text-[14px] font-[325px] flex gap-2 items-center flex-row text-gray-400'>
                            {payments.length} supporters
                            <div className='w-[4px] h-[4px] bg-gray-400 rounded-full'></div>
                            Since {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : ""}
                        </div>
                    </div>
                    <div>
                        <button className='px-20 top-2 relative font-bold text-sm py-3 hover:bg-gray-200 transition-colors bg-white text-black rounded-lg'>Join for free</button>
                    </div>
                </div>
                <div className="payment flex mb-8 flex-col md:flex-row gap-5 w-[100%] md:w-[80%]">
                    <div className="supporters w-full md:w-[50%] rounded-lg text-white p-10">
                        <h2 className='text-2xl font-bold my-1 mb-5'>Supporters</h2>
                        <ul className='mx-5 text-lg'>
                            {payments.length == 0 && <span>No Payments Yet</span>}
                            {payments.map((p, i) => {
                                return <li key={i} className='my-2 flex gap-3 text-wrap'>
                                    <div className='w-[32px] h-[32px] p-1 rounded-full overflow-clip bg-yellow-300'>
                                        <img className='max-w-fit' src="/avatar.gif" width={24} height={24} alt="" />
                                    </div>
                                    <span className='inline-block items-center'>
                                        {p.name} donated <span className='font-bold mx-[5px]'>₹{p.amount}</span> with a message {p.message}
                                    </span>
                                </li>
                            })}
                        </ul>
                    </div>

                    <div className="makepayment w-[50%] md:w-1/2 rounded-lg text-white p-4">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className="flex gap-2 flex-col items-center">
                            <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg' placeholder='Enter Name' />
                            <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg' placeholder='Enter Message' />
                            <input onChange={handleChange}
                                value={paymentform.amount} name='amount' type="text" className='w-full p-3 rounded-lg' placeholder='Enter Amount' />
                            <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} className='w-1/2 p-2 mt-3 font-extrabold disabled:opacity-[0.5] disabled:hover:shadow-none disabled:hover:text-white disabled:hover:cursor-not-allowed' disabled={!(paymentform.name?.length > 3 && paymentform.message?.length > 1 && paymentform?.amount > 10 ) || currentUser.razorpayid?.length < 1 && currentUser.razorpaysecret?.length < 1}>Pay</button>
                        </div>
                        {/* or choose from these other amounts */}
                        <div className='flex gap-5 mt-7 w-full'>
                            <button className='w-[30%] p-2 font-bold disabled:opacity-[0.5] disabled:hover:shadow-none disabled:hover:text-white disabled:hover:cursor-not-allowed' disabled={!(paymentform.name?.length > 3 && paymentform.message?.length > 1) || currentUser.razorpayid?.length < 1 && currentUser.razorpaysecret?.length < 1} onClick={() => pay(10000)}>Pay ₹100</button>
                            <button className='w-[30%] p-2 font-bold disabled:opacity-[0.5] disabled:hover:shadow-none disabled:hover:text-white disabled:hover:cursor-not-allowed' disabled={!(paymentform.name?.length > 3 && paymentform.message?.length > 1) || currentUser.razorpayid?.length < 1 && currentUser.razorpaysecret?.length < 1} onClick={() => pay(50000)}>Pay ₹500</button>
                            <button className='w-[30%] p-2 font-bold disabled:opacity-[0.5] disabled:hover:shadow-none disabled:hover:text-white disabled:hover:cursor-not-allowed' disabled={!(paymentform.name?.length > 3 && paymentform.message?.length > 1) || currentUser.razorpayid?.length < 1 && currentUser.razorpaysecret?.length < 1} onClick={() => pay(100000)}>Pay ₹1000</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage