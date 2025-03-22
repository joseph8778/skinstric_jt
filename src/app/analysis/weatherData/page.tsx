'use client'

import { DataBox } from '@/components/DataBox';
import { Header } from '@/components/Header';
import { LargeTitle } from '@/components/LargeTitle';
import { NavBtn } from '@/components/NavBtn';
import React from 'react';

const Page = () => {
    return (
        <>
        <Header/>
        <main>
        <LargeTitle title='Weather' titleClasses='520Brk:text-[64px]' subtitle='Weather condition in your location'
        subtitleClasses='520Brk:text-[14px] tracking-tight'
        />

        <div className="flex items-center justify-start gap-2 py-3">
            <i className="fa-solid fa-location-dot text-[20px]"/>
            <h1 className="location__title text-[32px] font-medium tracking-tighter">
            CHICAGO, IL, USA</h1>
        </div>
        <div className="dataBox__wrapper flex gap-3 w-full h-[450px]">
            <div className="dataBox__column flex flex-col gap-3  w-[33%] h-full">
                <DataBox wdt='100%' hgt='50%' 
                title='Air quality index'
                infoText='Air quality is healthy and poses little to no risk.'></DataBox>
                <DataBox wdt='100%' hgt='50%' 
                title='Air quality index'
                infoText='Air quality is healthy and poses little to no risk.'></DataBox>
            </div>
            <div className="dataBox__column flex flex-col gap-3 w-[33%] h-full">
                <DataBox wdt='100%' hgt='55%' 
                title='Air quality index'
                infoText='Air quality is healthy and poses little to no risk.'></DataBox>
                <DataBox wdt='100%' hgt='26%' 
                title='Air quality index'
                infoText='Air quality is healthy and poses little to no risk.'></DataBox>
                <DataBox wdt='100%' hgt='20%' 
                title='Air quality index'
                infoText='Air quality is healthy and poses little to no risk.'></DataBox>
            </div>
            <div className="dataBox__column flex flex-col gap-3 w-[33%] h-full">
                <DataBox wdt='100%' hgt='80%' 
                title='Air quality index'
                infoText='Air quality is healthy and poses little to no risk.'></DataBox>
                <DataBox wdt='100%' hgt='20%' 
                title='Air quality index'
                infoText='Air quality is healthy and poses little to no risk.'></DataBox>
            </div>
        </div>
        </main>
        <footer>
            <NavBtn direction='left'></NavBtn>
        </footer>
        </>
    );
}

export default Page;
