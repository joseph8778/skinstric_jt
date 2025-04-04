'use client';

import { Header } from "@/components/Header";
import { IntroSqrAnim } from "@/components/IntroSqrAnim";
import { IntroSquare } from "@/components/IntroSquare";
import { NavBtn } from "@/components/NavBtn";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {  useEffect, useRef, useState } from "react";
export default function Home() {
  const tlLeft = useRef<gsap.core.Timeline>(null)
  const tlRight = useRef<gsap.core.Timeline>(null)
  const tlMount = useRef<gsap.core.Timeline>(null)
  const leftContainer = useRef<HTMLDivElement>(null)
  const rightContainer = useRef<HTMLDivElement>(null)
  const leftSquares = useRef<HTMLDivElement[]>([])
  const rightSquares = useRef<HTMLDivElement[]>([])
  const headerRef = useRef<HTMLHeadingElement[]>([])
  const [loading, setloading] = useState(true);

  
  useGSAP(() => {
    if (loading === true) return
    const ctx = gsap.context(() => {
      tlMount.current = gsap.timeline({})
      .fromTo(
        ".textMount",
        { clipPath: "inset(0% 50% 0% 50%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: .5, }, .1)
        .to('.textMount',{ clipPath: "", duration: 0.01, })
        .from(".buttonMountL", { x: "25%", opacity: 0, duration: 1, }, 0)
        .from(".buttonMountR", { x: "-25%", opacity: 0, duration: 1, }, 0);


       tlLeft.current = gsap.timeline({paused: true})
       .set(headerRef.current, {right:"", clearProps:'right'})
       .to(rightContainer.current, {opacity:0, duration:.01} )
       .from(leftSquares.current, {opacity: 0, duration: 0.1, stagger:.1})
       .to(headerRef.current, { right:0 , duration: .5 , ease:"power2.inOut",})
       .to(rightContainer.current, {xPercent:100, duration:.05} )
       
       tlRight.current = gsap.timeline({paused: true})
       .set(headerRef.current, {left:"", clearProps:'left'})
       .to(leftContainer.current, {opacity: 0, duration:.01} )
       .from(rightSquares.current, {opacity: 0, duration: 0.1, stagger:.07})
       .to(headerRef.current, { left:0 , duration: .5,  ease:"power2.inOut",})
       .to(leftContainer.current, {xPercent:-100, duration:.05} )
    })
    return () => ctx.revert()
  }, [loading])

  const handleResize = () => {
    gsap.killTweensOf("*"); 
    if (tlLeft.current) tlLeft.current.invalidate().progress(0).pause();
    if (tlRight.current) tlRight.current.invalidate().progress(0).pause();
  };
  
  useEffect(() => {
    if ( !loading) {
      window.addEventListener("resize", handleResize);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [loading]);
  
 function reverseAnim() {
   tlMount.current?.reverse()
 }

  

return (
  <>
  {loading ? <IntroSqrAnim onComplete={() => setloading(false)}/> :
  <>
  <Header blackBtn="ENTER CODE"
  intro="visible"/>
    <main className="flex justify-center items-center min-h-[500px]">
      <div className="w-full flex justify-center items-center relative">

      <div ref={rightContainer} className="homeDirectory absolute size-[360px]  flex justify-start items-center right-0 translate-x-[220px] -bottom-1/8 pointer pointer-events-none"
       onMouseEnter={() => {if (tlRight.current) tlRight.current.play()
        console.log('mouse entered right!')

       }}
       onMouseLeave={() => {if (tlRight.current) tlRight.current.reverse()}}
       onClick={() => reverseAnim()}
      >
          <NavBtn 
          navText="TAKE TEST"
          direction="right" containerClasses="pointer-events-auto h-5"
          routerLink="/introduction"
          ></  NavBtn>
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

      <h1 ref={(el) => {if (el) headerRef.current.push(el)}} className="textMount hidden lg:inline-block md:text-[85px] text-center text-wrap max-w-[450px] font-light leading-[.9] absolute">Sophisticated skincare</h1>
      <h1 ref={(el) => {if (el) headerRef.current.push(el)}} className="textMount lg:hidden  text-[45px] md:text-[85px] text-center text-wrap max-w-[450px] font-light leading-[.9] absolute bottom-[150]">Sophisticated </h1>
      <h1 ref={(el) => {if (el) headerRef.current.push(el)}} className="textMount lg:hidden text-[45px] md:text-[85px] text-center text-wrap max-w-[450px] font-light leading-[.9] absolute top-[150]">Skincare</h1>

      <div ref={leftContainer} className="homeDirectory absolute  flex justify-end items-center left-0 -translate-x-[220px] -bottom-1/8 size-[360px] pointer-events-none"
      onMouseEnter={() => {if (tlLeft.current) tlLeft.current.play()}}
      onMouseLeave={() => {if (tlLeft.current) tlLeft.current.reverse()}}
      >
          <NavBtn 
          navText="DISCOVER A.I."
          direction="left" containerClasses="pointer-events-auto h-5 "></  NavBtn>
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
    <footer className="flex justify-center md:justify-start" >
    <h1 className="max-w-[316px] pb-4 text-center md:text-left">
      Skinstric developed an A.I. that creates a highly-personalised routine tailored to what your skin needs.</h1>
    </footer> </>}
  </>
  );
}
