import React, { useState } from 'react';
import triangle from '../assets/Polygon.svg';
import Image from 'next/image';
import { ExitPopup } from './ExitPopup';
import { useRouter } from 'next/navigation';

type btnProps = {
    direction: 'left' | 'right';
    setPage?: (value: number) => void;
    pageNum?: number;
    showGlobPop?: (bool: boolean) => void;
    routerLink?: string
    containerClasses?: string;
};

export const NavBtn = ({routerLink, pageNum, setPage, direction = 'left', showGlobPop, containerClasses }: btnProps) => {
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter()

    const mountAnimation = {
        left: 'buttonMountL',
        right: 'buttonMountR',
    };

    const rotation = {
        left: 'left-[6px]',
        right: 'rotate-180 right-[6px]',
    };

    const orientation = {
        left: true,
        right: false,
    };

    const page = {
        left: 1,
        right: 2,
    };

    return (
        <>
            {showPopup && pageNum === 1 && <ExitPopup showPopUp={setShowPopup} />}
            <button
                onClick={() => {
                    if(showGlobPop) {
                        showGlobPop(false)
                    }
                    if(routerLink) {
                        router.push(routerLink)
                        return
                    }
                    if (pageNum === 1 && direction === 'left') {
                        setShowPopup(true);
                    } else if(setPage) {
                        setShowPopup(false);
                        setPage(page[direction]);
                    }
                }}
                className={`
                    ${mountAnimation[direction]} 
                    group relative flex justify-center items-center 
                    font-roobert text-[clamp(.65rem,1vw,0.75rem)] 
                    tracking-tighter font-bold dark:text-white text-black ${containerClasses}
                `}
            >
                <Image
                    width={8}
                    height={8}
                    src={triangle}
                    alt=""
                    className={`absolute ${rotation[direction]} dark:invert dark:brightness-0 dark:brightness-500`}
                />

                {!orientation[direction] && (
                    <span className="
                        mr-4 transition-all ease-in-out duration-[400ms] 
                        group-hover:-translate-x-8 dark:text-white text-black
                    ">
                        PROCEED
                    </span>
                )}

                <div
                    className={`
                        w-[24px] h-[24px] border border-black dark:border-white border-1 
                        ${orientation[direction] && 'mr-4'} 
                        -rotate-45 transition-all duration-[400ms] 
                        ease-in-out group-hover:scale-[2]
                    `}
                />

                <div
                    className={`
                        w-[24px] h-[24px] outline-1 opacity-0 outline-dotted -rotate-45 absolute 
                        ${orientation[direction] ? 'left-0' : 'right-0'} 
                        transition-all ease-in-out duration-[400ms] 
                        group-hover:scale-[1.5] group-hover:opacity-100
                        dark:outline-white outline-1
                    `}
                />

                {orientation[direction] && (
                    <span className="
                        transition-all ease-in-out duration-[400ms] 
                        group-hover:translate-x-8
                    ">
                        BACK
                    </span>
                )}
            </button>
        </>
    );
};