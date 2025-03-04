'use client'

import { ScanBtn } from "@/components/ScanBtn";
import { Header } from "@/components/Header";
import { IntroSqrAnim } from "@/components/IntroSqrAnim";
import selectionIcon from '@/assets/coursor.svg'
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FilePopup from "@/components/FilePopup";

export default function TestingPage() {
    useGSAP(() => {
        const context = gsap.context(() => {
    
          gsap.fromTo(
            ".textMount",
            { clipPath: "inset(0% 50% 0% 50%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, delay: 5 }
          );
          
          gsap.from(".textMount2", { y: "100%", duration: 0.2, delay: 5 });
          gsap.from(".buttonMount", { x: "-25%", opacity: 0, duration: 1, delay: 5 });
        })
          
        return () => {
          context.revert()
        }
      });
  return (
    <>
<IntroSqrAnim/>
<div className="section_container">
    <header className="flex items-center">
        <Header/>
        <button className="w-[140px] h-8 bg-black text-white flex items-center justify-center hover:bg-slate-900">
            <span className="text-[10px] font-roobert font-semibold ">CONSULT CHEMIST</span>
        </button>
    </header>
<main className="flex-grow flex  justify-around items-center relative">

{/* <FilePopup></FilePopup> */}
    <div className="overflow-hidden absolute top-6 left-0 w-fit h-fit">
        <h2 className="font-roobert font-bold text-[clamp(.65rem,1vw,0.75rem)] leading-none textMount2" id="formPageTitle">
            TO START ANALYSIS
            <br />
            <span className="mt-10">WE USE COMPUTER VISION </span>
            <br />
            <span>TO GREATLY SPEED UP THE PROCESS</span>
        </h2>
    </div>
    <ScanBtn scanType="Camera"/>
    <ScanBtn scanType="Gallery"/>
    <Image className="absolute bottom-16" src={selectionIcon} alt="Selection Icon"/>
</main>
</div>

    </>
);
}
