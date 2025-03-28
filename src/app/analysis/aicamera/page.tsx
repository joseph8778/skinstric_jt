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

export default function AiCameraPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoBlurRef = useRef<HTMLVideoElement>(null);
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
                <div className="group absolute
                top-1/2 right-0 -translate-x-[10%] -translate-y-[50%]
                flex justify-center items-center gap-5"> 
                    <h1 className="z-10 dark:text-white font-semibold group-hover:-translate-x-[15%] transition-all ease-in-out duration-300">TAKE PICTURE</h1>
                        <div className="z-10 relative rounded-full bg-white size-16 flex justify-center items-center hover:cursor-pointer group-hover:scale-[1.2] transition-all duration-300 ease-in-out">
                            <div className="z-11 rounded-full border-2 border-gray-400 size-[95%] absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] ">
                                <Image src={cameraIcon} className='absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]' alt="cameraIcon"/>
                            </div>
                        </div>
                </div>
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
