'use client';

import { Header } from "@/components/Header";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NavBtn } from "@/components/NavBtn";
import { BgSquare } from "@/components/BgSquare";
import { NameInput } from "@/components/NameInput";
import { useState } from "react";
import axios from "axios";
import { LocInput } from "@/components/LocInput";
import { IntroSqrAnim } from "@/components/IntroSqrAnim";
import { Popup } from "@/components/Popup";
import { useRouter } from "next/navigation";

export default function IntroPage() {
  const router = useRouter()
  const [nameInput, setNameInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [page, setPage] = useState(1);
  const [showPopup, setShowPopup] = useState({
    visible: false,
    popupType: '',
    popupMsg: '',
  });

  // INTRO ANIMATIONS
  useGSAP(() => {
    const context = gsap.context(() => {

      gsap.fromTo(
        ".textMount",
        { clipPath: "inset(0% 50% 0% 50%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, delay: 5 }
      );
      
      gsap.from(".textMount2", { y: "100%", duration: 0.2, delay: 5 });
      gsap.from(".buttonMountL", { x: "25%", opacity: 0, duration: 1, delay: 5 });
    })
      
    return () => {
      context.revert()
    }
  });

  async function sendData(locationParam: string) {
    setShowPopup({visible: true, popupType: 'loading_Data', popupMsg: ''})
    try {
      const response = await axios.post(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
        { name: nameInput, location: locationParam }
      );
      console.log(response.data);
      setShowPopup({visible: true, popupType: '', popupMsg: `${nameInput} from ${locationParam.length > 20 ? (locationParam.slice(0, 20) + '...') : (locationParam)} has been added!`})
      setTimeout(() => router.push('/testing'), 3000);
    }
    catch (error: unknown) {
      console.error("Error sending data:", error);
      setShowPopup({visible: true, popupType: '', popupMsg: `Error Sending Data ${error}` })
    }
  }

  return (
    <>
      {showPopup.visible && (
        <Popup
          popupMsg={showPopup.popupMsg}
          popupType={showPopup.popupType}  
          setShowPopup={(value) => setShowPopup((prev) => ({...prev, visible: value}))} 
          displayTime={5} 
        />
      )}

      <IntroSqrAnim 
        linesAnimDuration={3} 
        fadeOutDuration={1} 
        aria-label="Introduction Animation"
      />

      <div
        id="formPage"
        className="section_container"
      >
        <Header
          intro="hidden"
          introText="INTRO"
          logoText="SKINSTRIC"
          logo="primaryStyle"
          parent="primaryStyle"
          aria-label="Website Header"
        />
        <main className="flex-grow flex flex-col justify-center items-center relative">
          <div className="overflow-hidden absolute top-6 left-0 w-fit h-fit">
            <h2 className="font-roobert font-bold text-[clamp(.65rem,1vw,0.75rem)] leading-none textMount2" id="formPageTitle">
              TO START ANALYSIS
            </h2>
          </div>

          {page === 2 ? (
            <LocInput
              setShowPopup={(bool, popType) => setShowPopup({visible: bool, popupType: popType, popupMsg: ''})}
              sendData={sendData}
              value={locationInput}
              setInput={setLocationInput}
              pageNum={page}
              setPage={setPage}
              focusText="Where are you from?"
              topText="CLICK TO TYPE"
              placeholderText="Where are you from?"
              aria-label="Location Input"
            />
          ) : (
            <NameInput
              setShowPopup={(bool, popType) => setShowPopup({visible: bool, popupType: popType, popupMsg: ''})}
              setInput={setNameInput}
              value={nameInput}
              pageNum={page}
              setPage={setPage}
              focusText="INTRODUCE YOURSELF"
              topText="CLICK TO TYPE"
              placeholderText="Introduce Yourself"
              aria-label="Name Input"
            />
          )}

          <BgSquare size="small" />
          <BgSquare size="medium" />
          <BgSquare size="big" />
        </main>

        <div className="footer w-full flex justify-between pb-10 px-0">
          <NavBtn 
            showGlobPop={(bool) => setShowPopup((prev) => ({...prev, visible: bool}))} 
            pageNum={page} 
            setPage={setPage} 
            direction="left"
            aria-label="Previous page button"
          />
          {nameInput.length > 0 && page === 1 && (
            <NavBtn 
              showGlobPop={(bool) => setShowPopup((prev) => ({...prev, visible: bool}))}  
              pageNum={page} 
              setPage={setPage} 
              direction="right"
              aria-label="Next page button"
            />
          )}
        </div>
      </div>
    </>
  );
}
