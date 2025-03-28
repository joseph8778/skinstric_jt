'use client'
import { Header } from "@/components/Header";
import { NavBtn } from "@/components/NavBtn";
import { PageLoader } from "@/components/PageLoader";
import shutter from '@/assets/shutter.svg'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import BetterResultsDisclaimer from "@/components/BetterResultsDisclaimer";
import cameraIcon from '@/assets/CameraIcon.svg'
import ActionButton from "@/components/ActionButton";
import { blob } from "stream/consumers";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AiCameraPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoBlurRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [videoerror, setVideoError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const {theme, setTheme } = useTheme()

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                console.log('Camera started')
                setVideoError(null);
                setLoading(false)
                if (videoRef.current && videoBlurRef.current) {
                    videoRef.current.srcObject = stream;
                    videoBlurRef.current.srcObject = stream;
                    setTheme('dark')
                }
            } catch (err) {
                setTheme('system')
                setLoading(false)
                setVideoError("Camera access denied or not available.");
                console.error(err);
            }
        }
        
        startCamera()
        
        
        return () => {
            setTheme('system')
            if (videoRef.current && videoRef.current.srcObject) {
                (videoRef.current.srcObject as MediaStream)
                    .getTracks()
                    .forEach(track => track.stop())
            }
        };
    }, [loading, videoRef, setTheme]);

    // useEffect(() => {
    //     console.log('Loading:', loading, 'Video Error:', videoerror);
    //     console.log('videoRef.current:', videoRef.current);
    // }, [loading, videoerror, videoRef.current]);


    const handleTakeImage = () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            if (context) {
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;

                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                const imageData = canvas.toDataURL('image/png');
                console.log('Captured image data URL:', imageData);

                const base64Data = imageData.split(',')[1];
                console.log('Base64 image data:', base64Data);

                canvas.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], 'captured-image.png', { type: 'image/png' });
                    console.log('Captured image:', file)
                    getPhotoData(file)
                    }
                }, 'iamge/png');

            }
        }
    }

    const router = useRouter()
    async function getPhotoData(selectedPhoto: File | null) {
        if (selectedPhoto) {
        //   animRef.current?.forEach((animation) =>  {
        //     animation.reverse()
        //   })
        //   setTimeout(() => {
        //     setpageLoader(true)
        //   }, 1700);
        
          
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
                    setVideoError('An error occurred while processing the image. Please try again.');
                } else {
                  console.log('Unexpected Error:', error);
                }
              }
            }
          };
          
          reader.readAsDataURL(selectedPhoto);
        }
      }

    return (
        <>
        {loading ? ( 
        <PageLoader customSize={200}>
            <div className="flex flex-col justify-center items-center pt-[10px]">
            <Image 
                style={{
                    width: 'clamp(100px, 10vw, 142px)',
                    height: 'auto',
                    paddingBottom: '10px'
                }} 
                src={shutter} 
                alt="shutterPicture"
                />
                <span className="text-[16px] font-[600] tracking-wide">SETTING UP CAMERA...</span>
                <BetterResultsDisclaimer></BetterResultsDisclaimer>

            </div>
        </PageLoader>
     
        ) : ( videoerror ? (<p className="w-screen h-screen flex justify-center items-center text-center">
        {videoerror} 
        <br />
        Please allow accesss or check your camera settings.
        </p>) : (

            <>
            
            <Header intro="visible"></Header>
            <main > 
                <video ref={videoBlurRef} autoPlay playsInline className="absolute top-0 left-0 w-full h-full object-cover blur-sm "></video>
                <video ref={videoRef} autoPlay playsInline  className="absolute top-0 left-0 w-full h-full object-cover [mask-image:radial-gradient(ellipse_25%_80%,#000_45%,transparent_55%)] z-0" />
         <ActionButton onClick={() => handleTakeImage()} icon={cameraIcon}></ActionButton>
        <canvas ref={canvasRef} className="hidden"></canvas>
                <div className="flex justify-center">
                <BetterResultsDisclaimer parentProps="static bottom-[30]"/>
                </div>
            </main>
            <footer >
                <NavBtn direction="left" routerLink="/testing"></NavBtn>
            </footer>
            </>
            )  
            )
        }
        </>
    )
}
