import { NavBar } from "@/components/NavBar";
import Image from "next/image";
import triangle from '../assets/Polygon.svg'

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden px-8">
      <NavBar />

      <main className="flex-grow flex flex-col justify-center items-center relative">
        <h2 className="font-roobert font-bold absolute top-6 left-0 text-xs">TO START ANALYSIS</h2>
        <div className="text-center pb-10">
          <p className="font-roobert text-sm opacity-35">CLICK TO TYPE</p>
          <input
            type="text"
            placeholder="Introduce yourself"
            
            className="
              placeholder-gray-900
              bg-transparent
              border-b-[1px] border-black outline-none font-roobert font-[400]
              -tracking-[5] 
              w-96 h-20 text-[52px] 
              text-center
            "
          />
        </div>
        <div className="dot-square w-[360px] h-[360px] border border-dotted border-gray-500 absolute -z-10 rotate-45 "></div>
        <div className="dot-square w-[400px] h-[400px] border border-dotted border-gray-400 absolute -z-10 rotate-45 "></div>
        <div className="dot-square w-[440px] h-[440px] border border-dotted border-gray-300 absolute -z-10 rotate-45 "></div>
      </main>

      <div className="footer w-full flex justify-between pb-10 px-0">
        <button className="flex justify-center items-center font-roobert text-xs tracking-tighter font-bold">
          <div className="w-[24px] h-[24px] border-black border  mr-4 -rotate-45 relative">
            <Image width={8} height={8} src={triangle} alt="" 
            className="
            top-[50%]
            right-[50%]
             translate-x-[25%]
             translate-y-[-75%]
             rotate-45
             absolute"
            />
          </div>
          BACK
        </button>
        <button className="flex justify-center items-center font-roobert font-semibold tracking-tighter text-xs">
         PROCEED
          <div className="w-[24px] h-[24px] border-black border rotate-[135deg]  ml-4 relative">
          <Image width={8} height={8} src={triangle} alt="" 
            className="
            top-[50%]
            right-[50%]
             translate-x-[25%]
             translate-y-[-75%]
             rotate-45
             absolute"
            />
          </div>
        </button>
      </div>
    </div>
  );
}
