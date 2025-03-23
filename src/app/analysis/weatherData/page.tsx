'use client'

import { DataBox } from '@/components/DataBox';
import { Header } from '@/components/Header';
import { LargeTitle } from '@/components/LargeTitle';
import { NavBtn } from '@/components/NavBtn';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect } from 'react';

const Page = () => {
    const latitude = localStorage.getItem('latitude')  // Access latitude
    const longitude = localStorage.getItem('longitude')  // Access latitude
    const locationName = localStorage.getItem('Location_Name')  

    
    useGSAP(() => {
        gsap.fromTo(
            ".textMount",
            { clipPath: "inset(0% 100% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1, delay: 0.2 }
        )
    }, [])
    
    useEffect(() => {
        if (latitude && longitude) {
            console.log(latitude, longitude); 
            console.log(locationName)
        } else {
            console.log('Lat and Lng missing');
        }
    }, [latitude, longitude]); 
    return (
        <>
        <Header/>
        <main>
        <LargeTitle title='Weather' titleClasses='520Brk:text-[64px]' subtitle='Weather condition in your location'
        subtitleClasses='520Brk:text-[14px] tracking-tight'
        />

        <div className="flex items-center justify-start gap-2 py-3">
            <i className="fa-solid fa-location-dot text-[20px]"/>
            <h1 className="textMount location__title text-[32px] font-medium tracking-tighter">
            {locationName}</h1>
        </div>
        <div className="dataBox__wrapper flex gap-3 w-full h-[450px]">
            <div className="dataBox__column flex flex-col gap-3  w-[33%] h-full">
                <DataBox wdt='100%' hgt='50%' 
                title='Air quality index'
                infoText='Air quality is healthy and poses little to no risk.'></DataBox>
                <DataBox wdt='100%' hgt='50%' 
                title='Season'
                infoText='NO DRY SEASON'
                infoTextClasses='text-[32px] font-[500]'
                infoNum={null}
                ></DataBox>
            </div>
            <div className="dataBox__column flex flex-col gap-3 w-[33%] h-full">
                <DataBox wdt='100%' hgt='55%' 
                title='POLLEN'
                infoText='Pollen released from gardern variety weeds can flare up sensitive skin and irritate pores
                oijwefoijef
                wef
                wef
                ewf
                wewefpwijewofijweofijewoifjewoeifjewofijewofij'></DataBox>
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
            <NavBtn direction='left' routerLink='/analysis/demographics'></NavBtn>
        </footer>
        </>
    );
}

export default Page;
