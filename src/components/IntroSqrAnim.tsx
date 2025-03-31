import React from 'react';
import { IntroSquare } from './IntroSquare';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

type introProps = {
    linesAnimDuration?: number,
    fadeOutDuration?: number,
    centerText?: string,
    onComplete?: () => void,
}

export const IntroSqrAnim = ({
    linesAnimDuration = 3, 
    fadeOutDuration = 1, 
    centerText = '',
    onComplete = () => {},
    }:introProps)=>{
        
    useGSAP(() => {
        const context = gsap.context(() => {
            const tl = gsap.timeline({onComplete});
            
            tl.to('.introSquare', {
                duration: linesAnimDuration,
                stagger: 0.1, 
                keyframes: [
                    { backgroundSize: "1px 0%, 0% 1px, 1px 0%, 0% 1px", duration: 0.75 },
                    { backgroundSize: "1px 100%, 0% 1px, 1px 0%, 0% 1px", duration: 0.75 },
                    { backgroundSize: "1px 100%, 100% 1px, 1px 0%, 0% 1px", duration: 0.75 }, 
                    { backgroundSize: "1px 100%, 100% 1px, 1px 100%, 0% 1px", duration: 0.75 }, 
                    { backgroundSize: "1px 100%, 100% 1px, 1px 100%, 100% 1px", duration: 0.75 }
                ],
            });
            
            tl.from('.introSquare', {
                opacity: 1,
                duration: fadeOutDuration,
                stagger: 0.25,
            });
            
            tl.to('.squares', {
                display: "none",
                duration: 0.01,
            });
        })
        return () => {
            context.revert()
        }
    });
    
    return (
       <div className="squares overflow-clip bg-white absolute z-10 w-screen h-screen
       flex justify-center items-center">
        <h1>{centerText}</h1>
        <IntroSquare startVisible={false} clampVW="60" minSize = '220' maxSize="380" opacity={0}/>
        <IntroSquare startVisible={false} clampVW="50" minSize = '180' maxSize="340" opacity={0}/>
        <IntroSquare startVisible={false} clampVW="40" minSize = '140' maxSize="300" opacity={0}/>
       </div>
    );
}

