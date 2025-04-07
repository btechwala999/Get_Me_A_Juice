"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";



export default function Home() {
  const [showImage, setShowImage] = useState(false);

  return (
    <div>

      <div className="flex flex-col gap-[60px] justify-center min-h-[100vh] -translate-y-0 w-full rounded-none bg-[url(/mainbg.jpg)]">
        <div className="font-bold text-4xl text-white flex mt-[290px] gap-7 justify-center flex-col items-end w-full">
          <div className="ml-[30vw] text-[50px] font-extrabold mr-[5vw]">
            A Sip of Support, A Flood of Creativity
          </div>
          <div className="text-[20px] text-gray-300 text-end font-extralight ml-[50vw] mr-[5vw]">
            Every creator needs a little fuel. Whether it is art, coding or the next big idea, your support is the juice that keeps them going.

          </div>
          <div className="text-[14px] text-gray-300 ml-[50vw] font-thin -mt-4 mr-[5vw]">
            Ready to fuel the next big thing?
          </div>
          <div className="ml-[50vw] mr-[5vw] -mt-2">
            <Link href={"/login"}>
              <button className=" text-[16px] hover:bg-black hover:scale-125 hover:transition-all hover:ease-in-out hover:duration-200 hover:text-white transition-all font-[900] text-black bg-white rounded-[30px] px-10 py-2">
                BUY ME A JUICE
              </button>
            </Link>
          </div>
        </div>
        <div
          className="justify-between items-center  hover:translate-y-1 hover:ease-in-out hover:duration-200 hover:transition-all hover:scale-110 flex-row flex  transition-all font-extrabold text-white bg-transparent rounded-[30px] m-auto cursor-pointer"
          onMouseEnter={() => setShowImage(true)}
          onMouseLeave={() => setShowImage(false)}
        >
          <button className="text-[16px] justify-center items-center hover:bg-white hover:text-black transition-all font-extrabold text-white bg-transparent rounded-[30px] px-7 py-2" onMouseEnter={() => setShowImage(true)}
            onMouseLeave={() => setShowImage(false)}>
            Explore More
          </button>
          <Image
            className={`absolute ml-[128px] rounded-full transition-opacity duration-[150ms] ease-out ${showImage ? "opacity-100" : "opacity-0"
              }`}
            src="/down-arrow.gif"
            alt="Down Arrow"
            width={26}
            height={26}
          />
        </div>
      </div>
      <div className="relative">

        <div className="bg-purple-500 h-[1px] opacity-[0.35]"></div>

        <div className="text-white container mx-auto pt-10 pb-16">
          <h2 className="text-2xl font-bold text-center my-8">Your Fans can buy you a JUICE!</h2>
          <div className="flex gap-5 justify-around my-5">
            <div className="item pt-10 rounded-full flex justify-center items-center flex-col">
              <img src="work1.gif" className="rounded-full p-2 " alt="" width={150} />
              <p className="font-bold mt-[24px]">Fans want to help</p>
              <p className="text-center mt-[10px] font-thin">Your fans are available for you to help you</p>
            </div>
            <div className="item rounded-full flex justify-center items-center space-y-3 flex-col">
              <img src="coin.gif" className=" p-2 " alt="" width={125} />
              <p className="font-bold">Fans want to help</p>
              <p className="text-center font-thin">Your fans are available for you to help you</p>
            </div>
            <div className="item rounded-full flex justify-center items-center space-y-3 flex-col">
              <img src="group.gif" className=" p-2 " alt="" width={125} />
              <p className="font-bold">Fans want to help</p>
              <p className="text-center font-thin">Your fans are available for you to help you</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-500 h-[1px] opacity-[0.35]"></div>

        <div className="text-white container mx-auto pt-10 pb-2">
          <h2 className="text-2xl font-bold text-center my-8">Learn More About Us</h2>
          <div className="flex gap-5 justify-around my-5">
            <div className="item pt-10 rounded-full flex justify-center items-center flex-col">
              <img src="work1.gif" className="rounded-full p-2 " alt="" width={150} />
              <p className="font-bold mt-[24px]">Fans want to help</p>
              <p className="text-center mt-[10px] font-thin">Your fans are available for you to help you</p>
            </div>
            <div className="item rounded-full flex justify-center items-center space-y-3 flex-col">
              <img src="coin.gif" className=" p-2 " alt="" width={125} />
              <p className="font-bold">Fans want to help</p>
              <p className="text-center font-thin">Your fans are available for you to help you</p>
            </div>
            <div className="item rounded-full flex justify-center items-center space-y-3 flex-col">
              <img src="group.gif" className=" p-2 " alt="" width={125} />
              <p className="font-bold">Fans want to help</p>
              <p className="text-center font-thin">Your fans are available for you to help you</p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
