import Image from "next/image";


export default function Home() {
  return (
    <div>

      <div className="flex justify-center min-h-[80vh] ">
        <div className="font-bold text-4xl text-white flex gap-7 justify-center flex-col items-center w-[50vw]"> A Sip of Support, A Flood of Creativity
          <div className="text-[20px] text-white">
            Every creator needs a little fuel. Whether it is art, coding or the next big idea, your support is the juice that keeps them going.
          </div>
          <div className="text-[17px] text-white">
            Ready to fuel the next big thing?
          </div>
          <div>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                BUY ME A JUICE
              </span>
            </button>
          </div>
        </div>
        <div>
          <img src="./Man.png" alt="" width={400} height={400} />
        </div>
      </div>
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
              <img src="coin.gif" className=" p-2 " alt="" width={125}  />
              <p className="font-bold">Fans want to help</p>
              <p className="text-center font-thin">Your fans are available for you to help you</p>
            </div>
            <div className="item rounded-full flex justify-center items-center space-y-3 flex-col">
              <img src="group.gif" className=" p-2 " alt="" width={125}/>
              <p className="font-bold">Fans want to help</p>
              <p className="text-center font-thin">Your fans are available for you to help you</p>
            </div>
          </div>
        </div>
         
        <div className="bg-purple-500 h-[1px] opacity-[0.35]"></div>

        <div className="text-white container mx-auto pt-10 pb-16">
          <h2 className="text-2xl font-bold text-center my-8">Learn More About Us</h2>
          <div className="flex gap-5 justify-around my-5">
            <div className="item pt-10 rounded-full flex justify-center items-center flex-col">
              <img src="work1.gif" className="rounded-full p-2 " alt="" width={150} />
              <p className="font-bold mt-[24px]">Fans want to help</p>
              <p className="text-center mt-[10px] font-thin">Your fans are available for you to help you</p>
            </div>
            <div className="item rounded-full flex justify-center items-center space-y-3 flex-col">
              <img src="coin.gif" className=" p-2 " alt="" width={125}  />
              <p className="font-bold">Fans want to help</p>
              <p className="text-center font-thin">Your fans are available for you to help you</p>
            </div>
            <div className="item rounded-full flex justify-center items-center space-y-3 flex-col">
              <img src="group.gif" className=" p-2 " alt="" width={125}/>
              <p className="font-bold">Fans want to help</p>
              <p className="text-center font-thin">Your fans are available for you to help you</p>
            </div>
          </div>
        </div>
    </div >
  );
}
