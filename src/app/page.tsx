'use client'

import { Header } from "@/components/Header";
import gsap from "gsap";
import { useGSAP } from '@gsap/react'
import { NavBtn } from "@/components/NavBtn";
import { BgSquare } from "@/components/BgSquare";
import { Input } from "@/components/Input";
import { IntroSquare } from "@/components/IntroSquare";
import { useState } from "react";
import axios from "axios";
import { LocInput } from "@/components/LocInput";


// API LINK: https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne
export default function Home() {

//INTRO ANIMATIONS
useGSAP(() => {
    gsap.fromTo('.textMount', {
     clipPath: 'inset(0% 50% 0% 50%)'
    },
  {
    clipPath: 'inset(0% 0% 0% 0%)',
    duration: .5,
    delay: 5,
  }
)
    gsap.from('.textMount2', {
    y: '100%',
    duration: .2,
    delay: 5
    }
)
    gsap.from('.buttonMountL', {
    x: '25%',
    opacity: 0,
    duration: 1,
    delay: 5
    }
)


gsap.to('.introSquare', {
  duration: 3,
  stagger: 0.25, 
  keyframes: [
    {
      backgroundSize: "1px 0%, 0% 1px, 1px 0%, 0% 1px",
      duration: 0.75,
    },
    {
      backgroundSize: "1px 100%, 0% 1px, 1px 0%, 0% 1px",
      duration: 0.75,
    },
    {
      backgroundSize: "1px 100%, 100% 1px, 1px 0%, 0% 1px",
      duration: 0.75, 
    },
    {
      backgroundSize: "1px 100%, 100% 1px, 1px 100%, 0% 1px",
      duration: 0.75, 
    },
    {
      backgroundSize: "1px 100%, 100% 1px, 1px 100%, 100% 1px",
      duration: 0.75, 
    },
  ],
});

  gsap.to('.introSquare', {
    opacity: 0,
    duration: 1,
    stagger: 0.25,
    delay: 3.5, 
  });

  gsap.to('.introSquare, .squares', {
    display: "none",
    duration: 0.01,
    stagger: 0.25,
    delay: 5,
  });


}, )

const [nameInput, setNameInput] = useState('');
const [locationInput, setLocationInput] = useState('');
const [page, setPage] = useState(1);

async function sendData() {
  try {
    const response = await axios.post('https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne', {name: nameInput, location: locationInput})
    console.log(response.data)
  } catch (error) {
    console.error('Error sending data:', error)
  }
}

return (
<>
{/* MAKE A WHOLE COMPONENT vvvvv */}
<div className="squares overflow-clip bg-white absolute z-10 w-screen h-screen
flex justify-center items-center">
 <IntroSquare clampVW="40" minSize = '140' maxSize="360"/>
 <IntroSquare clampVW="50" minSize = '180' maxSize="400"/>
 <IntroSquare clampVW="60" minSize = '220' maxSize="440"/>
</div>
    <div className="w-screen h-screen flex flex-col overflow-hidden px-8">
      <Header intro='hidden' introText='INTRO' logoText='SKINSTRIC' logo='primaryStyle' parent='primaryStyle' />
        <main className="flex-grow flex flex-col justify-center items-center relative">
          <div className="overflow-hidden absolute top-6 left-0 w-fit h-fit">
          <h2 className="font-roobert font-bold text-[clamp(.65rem,1vw,0.75rem)] leading-none textMount2">TO START ANALYSIS</h2>
          </div>
          
          {page === 2 ? 
            (<LocInput sendData = {sendData} value = {locationInput} setInput={setLocationInput} pageNum = {page} setPage={setPage} focusText = 'Where are you from?' topText = 'CLICK TO TYPE' placeholderText = 'Where are you from?'/>)
          : 
            (<Input setInput = {setNameInput} value = {nameInput} pageNum = {page} setPage = {setPage}  focusText = 'INTRODUCE YOURSELF' topText = 'CLICK TO TYPE' placeholderText = 'Introduce Yourself' />)
          }

            <BgSquare size='small'></BgSquare>
            <BgSquare size='medium'></BgSquare>
            <BgSquare size='big'></BgSquare>

        </main>

    <div className="footer w-full flex justify-between pb-10 px-0">
        <NavBtn setPage = {setPage} direction='left'></NavBtn>
        {nameInput.length > 0 && <NavBtn setPage = {setPage} direction="right"/>}
    </div>
</div>
</>
  );
}