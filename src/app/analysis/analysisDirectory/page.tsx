'use client';

import { BgSquare } from '@/components/BgSquare';
import { Header } from '@/components/Header';
import { IntroSquare } from '@/components/IntroSquare';
import { NavBtn } from '@/components/NavBtn';
import React from 'react';

const AnalysisDirectoryPage = () => {
    return (
        <>
        <Header></Header>
        <main>
            <div className="w-full h-full flex justify-center items-center">
            <IntroSquare
             maxSize='340'
             minSize='140'
             startVisible={true}/>
            <IntroSquare
            maxSize='380'
            minSize='160'
            clampVW='45'
            startVisible={true}/>
            <IntroSquare
            maxSize='420'
            minSize='200'
            clampVW='50'
            startVisible={true}/>
            
            <div className="directorySelections  rotate-45 flex flex-wrap gap-1 "
            style={{width: `clamp(80px, 30vw, 260px)`, 
            height: `clamp(80px, 30vw, 260px)`}}>
                <button className="hover:cursor-pointer hover:opacity-90 w-[49%] h-[49%] bg-gray-300"></button>
                <button className="hover:cursor-pointer hover:opacity-90 w-[49%] h-[49%] bg-gray-700"></button>
                <button className="hover:cursor-pointer hover:opacity-90 w-[49%] h-[49%] bg-gray-400"></button>
                <button className="hover:cursor-pointer hover:opacity-90 w-[49%] h-[49%] bg-gray-500"></button>
            </div>
            </div>
        </main>
        <footer>
            <NavBtn direction='left'></NavBtn>
        </footer>
        </>
    );
}

export default AnalysisDirectoryPage;
