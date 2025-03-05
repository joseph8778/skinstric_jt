'use client'

import { Header } from "@/components/Header";
import { NavBtn } from "@/components/NavBtn";

export default function TestingPage() {
  return (
    <>
      {/* <IntroSqrAnim /> */}
      <div className="section_container">
        <Header blackBtn="CONSULT CHEMIST" />
        
        <main className="flex-grow flex flex-col justify-start items-center relative">
          <div className="w-full flex flex-col h-[20%] justify-start items-start">
            <h1 className="text-[42px] tracking-tighter">DEMOGRAPHICS</h1>
            <p className="text-[12px]">PREDICTED AGE AND RACE</p>
          </div>

          <div className="w-full h-[80%] flex">
            {/* Left Section */}
            <div className="w-[13%] flex flex-col justify-start items-center">
            <button
  id="RaceBox"
  className="w-full h-[20%] text-black font-roobert font-semibold border-[1px] border-t-black bg-[#f3f3f4] hover:bg-[#d1d1d3] focus:bg-black focus:text-white flex flex-col justify-between items-start p-3 mb-2"
>
  <span className="text-[14px]">MIDDLE EASTERN</span>
  <span className="text-[14px]">RACE</span>
</button>

<button
  id="AgeBox"
  className="w-full h-[20%] text-black font-roobert font-semibold border-[1px] border-t-black bg-[#f3f3f4] hover:bg-[#d1d1d3] focus:bg-black focus:text-white flex flex-col justify-between items-start p-3 mb-2"
>
  <span className="text-[14px]">20-29</span>
  <span className="text-[14px]">AGE</span>
</button>

<button
  id="GenderBox"
  className="w-full h-[20%] text-black font-roobert font-semibold border-[1px] border-t-black bg-[#f3f3f4] hover:bg-[#d1d1d3] focus:bg-black focus:text-white flex flex-col justify-between items-start p-3 mb-2"
>
  <span className="text-[14px]">MALE</span>
  <span className="text-[14px]">GENDER</span>
</button>


            </div>

            {/* Middle Section */}
            <div className="w-[62%] mx-4 border-[1px] border-t-black bg-[#f3f3f4] p-4 relative">
              <span>A.I. CONFIDENCE</span>
              <div className="size-[306px] absolute bottom-5 right-5 border-2 border-black rounded-full flex justify-center items-center text-[35px]">
                <span className="ml-2">5%</span>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-[26%] border-[1px] border-t-black bg-[#f3f3f4] flex flex-col justify-start">
              <div className="flex flex-col w-full h-full">
              <div className="p-3 w-full h-[46px] flex items-center justify-between font-roobert text-[14.5px]">
                <span>RACE</span>
                <span>A.I. CONFIDENCE</span>
              </div>
<button className="p-3 w-full h-[46px] flex items-center justify-between transition-colors duration-100 ease-in-out text-black bg-[#f3f3f4] hover:bg-[#d1d1d3] focus:bg-black focus:text-white group">
  <div className="text-[14px] font-roobert font-medium flex items-center p-1">
    <span 
      className="size-[.75rem] border-[2px] bg-transparent border-black rotate-45 mr-3 transition-colors   relative group-focus:border-white "
      aria-hidden="true"
    >
        <span className="absolute size-[3px] bg-transparent bottom-[50%] right-[50%] translate-x-[40%] translate-y-[40%] group-focus:bg-white"></span>
    </span>
    <span>Black</span>
  </div>
  <span className="font-roobert text-[14px]">99.2</span>
</button>
<button className="p-3 w-full h-[46px] flex items-center justify-between transition-colors duration-100 ease-in-out text-black bg-[#f3f3f4] hover:bg-[#d1d1d3] focus:bg-black focus:text-white group">
  <div className="text-[14px] font-roobert font-medium flex items-center p-1">
    <span 
      className="size-[.75rem] border-[2px] bg-transparent border-black rotate-45 mr-3 transition-colors   relative group-focus:border-white "
      aria-hidden="true"
    >
        <span className="absolute size-[3px] bg-transparent bottom-[50%] right-[50%] translate-x-[40%] translate-y-[40%] group-focus:bg-white"></span>
    </span>
    <span>Black</span>
  </div>
  <span className="font-roobert text-[14px]">99.2</span>
</button>
<button className="p-3 w-full h-[46px] flex items-center justify-between transition-colors duration-100 ease-in-out text-black bg-[#f3f3f4] hover:bg-[#d1d1d3] focus:bg-black focus:text-white group">
  <div className="text-[14px] font-roobert font-medium flex items-center p-1">
    <span 
      className="size-[.75rem] border-[2px] bg-transparent border-black rotate-45 mr-3 transition-colors   relative group-focus:border-white "
      aria-hidden="true"
    >
        <span className="absolute size-[3px] bg-transparent bottom-[50%] right-[50%] translate-x-[40%] translate-y-[40%] group-focus:bg-white"></span>
    </span>
    <span>Black</span>
  </div>
  <span className="font-roobert text-[14px]">99.2</span>
</button>
<button className="p-3 w-full h-[46px] flex items-center justify-between transition-colors duration-100 ease-in-out text-black bg-[#f3f3f4] hover:bg-[#d1d1d3] focus:bg-black focus:text-white group">
  <div className="text-[14px] font-roobert font-medium flex items-center p-1">
    <span 
      className="size-[.75rem] border-[2px] bg-transparent border-black rotate-45 mr-3 transition-colors   relative group-focus:border-white "
      aria-hidden="true"
    >
        <span className="absolute size-[3px] bg-transparent bottom-[50%] right-[50%] translate-x-[40%] translate-y-[40%] group-focus:bg-white"></span>
    </span>
    <span>Black</span>
  </div>
  <span className="font-roobert text-[14px]">99.2</span>
</button>
<button className="p-3 w-full h-[46px] flex items-center justify-between transition-colors duration-100 ease-in-out text-black bg-[#f3f3f4] hover:bg-[#d1d1d3] focus:bg-black focus:text-white group">
  <div className="text-[14px] font-roobert font-medium flex items-center p-1">
    <span 
      className="size-[.75rem] border-[2px] bg-transparent border-black rotate-45 mr-3 transition-colors   relative group-focus:border-white "
      aria-hidden="true"
    >
        <span className="absolute size-[3px] bg-transparent bottom-[50%] right-[50%] translate-x-[40%] translate-y-[40%] group-focus:bg-white"></span>
    </span>
    <span>Black</span>
  </div>
  <span className="font-roobert text-[14px]">99.2</span>
</button>


              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <div className="footer w-full flex justify-between pb-10 px-0">
          <NavBtn direction="left" aria-label="Previous page button" />
        </div>
      </div>
    </>
  );
}
