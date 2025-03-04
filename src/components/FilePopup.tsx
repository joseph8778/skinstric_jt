import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

const FilePopup = () => {
    const containerRef = useRef(null)
useGSAP(() => {
    const context = gsap.context(() => {

        const tl = gsap.timeline()
        
        tl.fromTo(containerRef.current, {
            x: '-100px'
       
        },
    {
        x: '100px',
        duration: 5,
        delay: 5,
        ease: 'bounce.out'
    })
        
    })
    return () => context.revert()
    }, [])


    return (
        <div ref={containerRef}>
            <div className="absolute right-[50%] bottom-[50%] translate-x-[50%] translate-y-[50%] w-[432px] h-[353px] bg-black z-[100] flex flex-col">
<div className="w-full  h-[15%] text-white flex items-center font-roobert p-4">
Please ensure your selfie has:
</div>
<div className="w-full  h-[70%] text-white flex items-center border-b-2 border-t-2 p-4">
    <ul className="h-full w-full flex flex-col items-start">
        <li className="flex flex-col items-start h-[33%]">
            
            <div className="flex">
            <div className="bulletPoint size-[.5rem] border border-white rotate-45 mr-4 mt-2"/>
            Neutral Expression
            </div>
           <p className="pl-6 text-gray-500">
             Smiling may distort wrinkles
            </p>
        </li>
        <li className="flex flex-col items-start h-[33%]">
            
            <div className="flex">
            <div className="bulletPoint size-[.5rem] border border-white rotate-45 mr-4 mt-2"/>
           Frontal Pose
            </div>
           <p className="pl-6 text-gray-500">
             Take the picture from arms length at eye level
            </p>
        </li>
        <li className="flex flex-col items-start h-[33%]">
            
            <div className="flex">
            <div className="bulletPoint size-[.5rem] border border-white rotate-45 mr-4 mt-2"/>
            Adequate Lighting
            </div>
           <p className="pl-6 text-gray-500">
             Avoid harsh downlighting and aim for natural or soft light
            </p>
        </li>
        
    </ul>
</div>
    <div className="h-[15%] w-full flex items-center justify-end p-4 text-white">
        <button>Cancel</button>
        <button className="ml-8">Upload</button>
    </div>
</div>
        </div>
    );
}

export default FilePopup;
