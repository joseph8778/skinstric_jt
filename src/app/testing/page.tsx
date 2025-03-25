'use client'

import { ScanBtn } from "@/components/ScanBtn";
import { Header } from "@/components/Header";
import { IntroSqrAnim } from "@/components/IntroSqrAnim";
import selectionIcon from '@/assets/coursor.svg'
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FilePopup from "@/components/FilePopup";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Popup } from "@/components/Popup";
import { PageLoader } from "@/components/PageLoader";
import { NavBtn } from "@/components/NavBtn";


export default function TestingPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [galleryPopup, setGalleryPopup] = useState(false);
  const [popup, setPopup] = useState(false);
  const [pageLoader, setpageLoader] = useState(false);
  const animRef = useRef<gsap.core.Animation[] | null>(null);
  
  useGSAP(() => {
    const context = gsap.context(() => {
      animRef.current = []
      
      animRef.current?.push(gsap.fromTo(
        ".textMount",
        { clipPath: "inset(0% 50% 0% 50%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, delay: 5 }
      ));
      
      animRef.current?.push(gsap.from(".textMount2", { y: "100%", duration: 0.2, delay: 5 }));
      animRef.current?.push(gsap.from(".buttonMount", { x: "-25%", opacity: 0, duration: 1, delay: 5 }));
    });
    return () => {
      context.revert();
    };
  });
  
  const router = useRouter()
  async function getPhotoData(selectedPhoto: File | null) {
    if (selectedPhoto) {
      animRef.current?.forEach((animation) =>  {
        animation.reverse()
      })
      setTimeout(() => {
        setpageLoader(true)
      }, 1700);
    
      
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        const base64Image = reader.result?.toString().split(',')[1];  

        if (base64Image) {
         
          try {
            const response = await axios.post(
              'https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo',
              { image: base64Image },
              {
                headers: {
                  "Content-Type": 'application/json',  
                },
              }
            );
           
            console.log(response.data.data);
            localStorage.setItem('DemoData', JSON.stringify(response.data.data))
            router.push(`/analysis/demographics`)
            
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log('Error Response:', error)
              setPopup(true)
            } else {
              console.log('Unexpected Error:', error);
            }
          }
        }
      };
      
      reader.readAsDataURL(selectedPhoto);
    }
  }
  
  useEffect(() => {
    if (selectedPhoto) {
      getPhotoData(selectedPhoto);
    }
    return () => {
    };
  }, [selectedPhoto])

  if (pageLoader) {
    return <PageLoader >
              <span>PREPARING YOUR ANALYSIS...</span>
           </PageLoader>
  }
  
  return (
    <>
      <IntroSqrAnim />
  {popup && <Popup setShowPopup={setPopup} popupMsg="Error transferring file, please upload again."/>}
          <Header blackBtn="CONSULT CHEMIST"/>
          <div className="overflow-hidden absolute top-20 left-8 w-fit h-fit">
            <h2 className="font-roobert font-bold text-[clamp(.65rem,1vw,0.75rem)] leading-none textMount2" id="formPageTitle">
              TO START ANALYSIS
            </h2>
          </div>
          <main className="relative flex md:flex-row flex-col justify-between md:justify-center items-center pb-6 pt-24 md:p-[2rem]">
          {galleryPopup && <FilePopup setSelectedPhoto={setSelectedPhoto} setPopup={setGalleryPopup} />}

          <ScanBtn setPopup={setGalleryPopup} scanType="Camera" />
          <ScanBtn setPopup={setGalleryPopup} scanType="Gallery" />



          <Image className="absolute hidden md:block -bottom-12" src={selectionIcon} alt="Selection Icon" />
        </main>
        <footer className="relative py-6 flex items-center justify-between">
          <NavBtn direction="left" routerLink="/introduction" />
        </footer>
    </>
  );
}
