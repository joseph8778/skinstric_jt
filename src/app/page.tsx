'use client';

import { Header } from "@/components/Header";
import { IntroSquare } from "@/components/IntroSquare";
import { NavBtn } from "@/components/NavBtn";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
export default function Home() {
  const tlLeft = useRef<gsap.core.Timeline>(null)
  const tlRight = useRef<gsap.core.Timeline>(null)
  const leftContainer = useRef<HTMLDivElement>(null)
  const rightContainer = useRef<HTMLDivElement>(null)
  const leftSquares = useRef<HTMLDivElement[]>([])
  const rightSquares = useRef<HTMLDivElement[]>([])
  const headerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
       tlLeft.current = gsap.timeline({paused: true})
       .set(headerRef.current, {right:"", clearProps:'right'})
       .from(leftSquares.current, {opacity: 0, duration: 0.1, stagger:.1})
       .to(rightContainer.current, {xPercent:100, duration:.05} )
       .to(headerRef.current, { right:0 , duration: .3, ease:"expo.inOut"})
       
       tlRight.current = gsap.timeline({paused: true})
       .set(headerRef.current, {left:"", clearProps:'left'})
       .from(rightSquares.current, {opacity: 0, duration: 0.1, stagger:.07})
       .to(leftContainer.current, {xPercent:-100, duration:.05} )
       .to(headerRef.current, { left:0 , duration: .2, ease:"expo.inOut"})
    })
    return () => ctx.revert()
  }, [])

return (
  <>
  <Header blackBtn="ENTER CODE"
  intro="visible"/>
    <main className="flex justify-center items-center min-h-[500px]">
      <div className="w-full flex justify-center items-center relative">

      <div ref={rightContainer} className="homeDirectory absolute size-[360px]  flex justify-start items-center right-0 translate-x-[220px] -bottom-1/8 pointer pointer-events-none"
       onMouseEnter={() => {if (tlRight.current) tlRight.current.play()}}
       onMouseLeave={() => {if (tlRight.current) tlRight.current.reverse()}}
      >
          <NavBtn direction="right" containerClasses="pointer-events-auto h-5"></  NavBtn>
          <IntroSquare minSize="360" 
          clampVW="100"
          startVisible={true}
          opacity={1}
          >
          </IntroSquare>
          <IntroSquare minSize="440" 
          clampVW="100"
          startVisible={true}
          opacity={.5}
          ref={(el) => {if (el) rightSquares.current.push(el)}}
          >
          </IntroSquare>
          <IntroSquare minSize="520" 
          clampVW="100"
          startVisible={true}
          opacity={.25}
          ref={(el) => {if (el) rightSquares.current.push(el)}}
          >
          </IntroSquare>
      </div>

      <h1 ref={headerRef} className="text-[75px] text-center text-wrap max-w-[450px] font-light leading-[.9] absolute">Sophisticated skincare</h1>

      <div ref={leftContainer} className="homeDirectory absolute  flex justify-end items-center left-0 -translate-x-[220px] -bottom-1/8 size-[360px] pointer-events-none"
      onMouseEnter={() => {if (tlLeft.current) tlLeft.current.play()}}
      onMouseLeave={() => {if (tlLeft.current) tlLeft.current.reverse()}}
      >
          <NavBtn direction="left" containerClasses="pointer-events-auto h-5 "></  NavBtn>
          <IntroSquare minSize="360" 
          clampVW="100"
          startVisible={true}
          opacity={1}
          >
          </IntroSquare>
          <IntroSquare minSize="440" 
          clampVW="100"
          startVisible={true}
          opacity={.5}
          ref={(el) => {if (el) leftSquares.current.push(el)}}
          >
          </IntroSquare>
          <IntroSquare minSize="520" 
          clampVW="100"
          startVisible={true}
          opacity={.25}
          ref={(el) => {if (el) leftSquares.current.push(el)}}
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
