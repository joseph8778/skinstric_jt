import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { ReactNode, useRef } from 'react'

type DataBoxProps = {
    title?: string;
    titleClasses?: string;

    infoNum?: number | null;
    infoText?: string;
    infoNumClasses?: string
    infoTextClasses?: string

    boxClasses?: string;
    children?: ReactNode;

    hgt?: string;
    wdt?: string
}

export const DataBox = ({
    boxClasses,
    children,
    title = 'Title', 
    infoText = 'Info',
    infoNum = 1,
    infoNumClasses,
    infoTextClasses,
    hgt = "200px",
    wdt = "300px"}:DataBoxProps) => {
        
        const dataBoxRef = useRef<HTMLDivElement>(null)
        useGSAP(() => {
           const context = gsap.context(() => {
                if(dataBoxRef.current) {
                    const tl = gsap.timeline()
                    tl.fromTo(
                        dataBoxRef.current,
                        { clipPath: "inset(0% 100% 99.5% 0%)" },
                        { clipPath: "inset(0% 0% 99.5% 0%)", ease: "power2.inOut", duration: 0.3 }
                    );
                    
                    tl.to(dataBoxRef.current, {
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: .6,
                        ease: "power3.inOut",
                    },);
                    
                }
         
          }, dataBoxRef)
          return () => context.revert();
        }, []);
        
    return (
        <div ref={dataBoxRef} className={`border border-t-black bg-[#f3f3f4] flex flex-col items-center justify-center ${boxClasses}`}
        style={{ width: `${wdt}`, height: `${hgt}`}}>

            <h1 className='w-full h-[25%] flex justify-start items-start p-3 tracking-tight font-[600]'>
                {title.toUpperCase()}
            </h1>
                
            <div className="w-full h-[50%]">
                {children}
            </div>

            <div className={`flex flex-col items-end justify-end w-full h-[25%] p-3`}>
                <span className={`text-[32px] ${infoNumClasses}`}>
                    {infoNum}
                </span>
                <span className={` tracking-tight text-[14px] text-wrap wrap w-[75%] text-right ${infoTextClasses}`}>
                        {infoText}
                </span>    
            </div>
            
        </div>
    )
}