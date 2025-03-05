'use client'

import { ScanBtn } from "@/components/ScanBtn";
import { Header } from "@/components/Header";
import { IntroSqrAnim } from "@/components/IntroSqrAnim";
import selectionIcon from '@/assets/coursor.svg'
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FilePopup from "@/components/FilePopup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function TestingPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [galleryPopup, setGalleryPopup] = useState(false);
  
  useGSAP(() => {
    const context = gsap.context(() => {
      
      gsap.fromTo(
        ".textMount",
        { clipPath: "inset(0% 50% 0% 50%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, delay: 5 }
      );
      
      gsap.from(".textMount2", { y: "100%", duration: 0.2, delay: 5 });
      gsap.from(".buttonMount", { x: "-25%", opacity: 0, duration: 1, delay: 5 });
    });
    
    return () => {
      context.revert();
    };
  });
  
  // Convert selected photo to base64 and send it to the API
  const router = useRouter()
  async function getPhotoData(selectedPhoto: File | null) {
    if (selectedPhoto) {
      const reader = new FileReader();
      
      // Convert image to base64 when the file is read
      reader.onloadend = async () => {
        const base64Image = reader.result?.toString().split(',')[1];  // Remove the "data:image/*;base64," part
        console.log(reader.result)
        if (base64Image) {
          
          //   const data = { Image: reader.result };  // Data to send to the API
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
            console.log(response.data);
            router.push('/analysis/demographics')
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log('Error Response:', error.response?.data);
              console.log('Error Status:', error.response?.status);
            } else {
              console.log('Unexpected Error:', error);
            }
          }
        }
      };
      
      // Read the file as base64
      reader.readAsDataURL(selectedPhoto);
    }
  }
  
  useEffect(() => {
    if (selectedPhoto) {
      getPhotoData(selectedPhoto);
    }
    return () => {
      // Cleanup if needed
    };
  }, [selectedPhoto]);
  
  return (
    <>
      <IntroSqrAnim />
      <div className="section_container">
          <Header blackBtn="CONSULT CHEMIST"/>
          <main className="flex-grow flex justify-around items-center relative">
          {galleryPopup && <FilePopup setSelectedPhoto={setSelectedPhoto} setPopup={setGalleryPopup} />}
          <div className="overflow-hidden absolute top-6 left-0 w-fit h-fit">
            <h2 className="font-roobert font-bold text-[clamp(.65rem,1vw,0.75rem)] leading-none textMount2" id="formPageTitle">
              TO START ANALYSIS
              <br />
              <span className="mt-10">WE USE COMPUTER VISION </span>
              <br />
              <span>TO GREATLY SPEED UP THE PROCESS</span>
            </h2>
          </div>
          <ScanBtn setPopup={setGalleryPopup} scanType="Camera" />
          <ScanBtn setPopup={setGalleryPopup} scanType="Gallery" />
          <Image className="absolute bottom-16" src={selectionIcon} alt="Selection Icon" />
        </main>
      </div>
    </>
  );
}
