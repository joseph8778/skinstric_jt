'use client';

import { Header } from "@/components/Header";
import { IntroSquare } from "@/components/IntroSquare";
import { NavBtn } from "@/components/NavBtn";
export default function Home() {

return (
  <>
  <Header blackBtn="ENTER CODE"
  intro="visible"/>
    <main className="flex justify-center items-center min-h-[500px]">
      <div className="w-full flex justify-center items-center relative">

      <div className="homeDirectory absolute size-[360px]  flex justify-start items-center right-0 translate-x-[220px] -bottom-1/8 pointer pointer-events-none">
          <NavBtn direction="right" containerClasses="pointer-events-auto h-5"></  NavBtn>
          <IntroSquare minSize="360" 
          clampVW="100"
          startVisible={true}
          opacity={1}
          >
          </IntroSquare>
          <IntroSquare minSize="440" 
          clampVW="100"
          startVisible={false}
          opacity={.5}
          >
          </IntroSquare>
          <IntroSquare minSize="520" 
          clampVW="100"
          startVisible={false}
          opacity={.25}
          >
          </IntroSquare>
      </div>

      <h1 className="text-[75px] text-center text-wrap max-w-[450px] font-light leading-[.9]">Sophisticated skincare</h1>

      <div className="homeDirectory absolute  flex justify-end items-center left-0 -translate-x-[220px] -bottom-1/8 size-[360px] pointer-events-none ">
          <NavBtn direction="left" containerClasses="pointer-events-auto h-5 "></  NavBtn>
          <IntroSquare minSize="360" 
          clampVW="100"
          startVisible={true}
          opacity={1}
          >
          </IntroSquare>
          <IntroSquare minSize="440" 
          clampVW="100"
          startVisible={false}
          opacity={.5}
          >
          </IntroSquare>
          <IntroSquare minSize="520" 
          clampVW="100"
          startVisible={false}
          opacity={.25}
          >
          </IntroSquare>
      </div>
      </div>
    </main>
    <footer>
    <h1 className="max-w-[316px] pb-4">
      Skinstric developed an A.I. that creates a highly-personalised routine tailored to what your skin needs.</h1>
    </footer>
  </>
  );
}
