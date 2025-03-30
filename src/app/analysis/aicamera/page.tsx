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
// import { blob } from "stream/consumers";
// import axios from "axios";
// import { useRouter } from "next/navigation";
import { HandleDemoData } from "@/utils/HandleDemoData";
import { useRouter } from "next/navigation";

export default function AiCameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBlurRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoerror, setVideoError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [routerLoader, setRouterLoader] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const flashRef = useRef<HTMLDivElement | null>(null);
  const shuttermp3Ref = useRef<HTMLAudioElement | null>(null);
  const beepRef = useRef<HTMLAudioElement | null>(null);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  
  useEffect(() => {
    setTheme('system');
    
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setLoading(false);
        
        if (videoRef.current && videoBlurRef.current) {
          videoRef.current.srcObject = stream;
          videoBlurRef.current.srcObject = stream;

          setVideoError(null);
          setTheme('dark');

          console.log(loading, 'Loading');
        }
      } catch (err) {
        setTheme('system');
        setLoading(false);
        setVideoError("Camera access denied or not available.");
        console.error(err);
      }
    };

    startCamera();

    const currentVideoRef = videoRef.current;

    return () => {
      setTheme('system');
      if (currentVideoRef && currentVideoRef.srcObject) {
        (currentVideoRef.srcObject as MediaStream)
          .getTracks()
          .forEach(track => track.stop());
      }
    };
  }, [loading, videoRef]);

  const triggerTimer = () => setTimer(3);

  useEffect(() => {
    shuttermp3Ref.current = new Audio('/sounds/shuttersound.mp3');
    beepRef.current = new Audio('/sounds/countdownBeep.mp3');

    if (timer !== null && timer > 0) {
      beepRef.current?.play();
      timerRef.current = setTimeout(() => {
        setTimer((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (timer === 0) {
      console.log('Timer finished');
      shuttermp3Ref.current.currentTime = 0.3; // Reset the audio to the beginning
      shuttermp3Ref.current?.play();
      setTimeout(() => {
        setTimer(null);
      }, 300);
      setTimeout(() => {
        handleTakeImage();
      }, 1500);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timer]);

  const handleTakeImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        context.drawImage(
          videoRef.current,
          0,
          0,
          canvas.width,
          canvas.height
        );

        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'captured-image.png', { type: 'image/png' });
            getDemoData(file); //Pass file to global demoData function
          }
        }, 'image/png');
      }
    }
  };

  const getDemoData = async (selectedPhoto: File | null) => {
    if (selectedPhoto) {
        await HandleDemoData(selectedPhoto, {
          setLoader: setRouterLoader,
          onError: () => {
            setRouterLoader(false)
            setVideoError('An error occurred while processing the image. Please try again.');
          },
          postProcess: () => {
          router.push('/analysis/demographics');
          }
      });
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
            <BetterResultsDisclaimer />
          </div>
        </PageLoader>
      ) : (
        videoerror ? (
          <p className="w-screen h-screen flex justify-center items-center text-center">
            {videoerror}
            <br />
            Please allow access or check your camera settings.
          </p>
        ) : (
          routerLoader ? (
            <PageLoader>PREPARING YOUR ANALYSIS</PageLoader>
          ) : (
            <>
              <Header intro="visible" />
              <main>
                <video
                  ref={videoBlurRef}
                  autoPlay
                  playsInline
                  className="absolute top-0 left-0 w-full h-full object-cover blur-sm "
                  ></video>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="absolute top-0 left-0 w-full h-full object-cover [mask-image:radial-gradient(ellipse_25%_70%,#000_65%,transparent_75%)] z-0"
                  />
                <ActionButton onClick={() => { if (timer === null) triggerTimer(); }} icon={cameraIcon} />
                {timer !== null && timer > 0 && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold z-10">
                    {timer}
                  </div>
                )}
                {timer === 0 && <div ref={flashRef} className="absolute top-0 left-0 w-screen h-screen bg-white opacity-75 z-[121]" />}
                <canvas ref={canvasRef} className="hidden" />
                <div className="flex justify-center">
                  <BetterResultsDisclaimer parentProps="static bottom-[62px]" />
                </div>
              </main>
              <footer>
                <NavBtn direction="left" routerLink="/testing" />
              </footer>
            </>
          )
        )
      )}
    </>
  );
}

// async function getDemoData(selectedPhoto: File | null) {
//   if (selectedPhoto) {
//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       const base64Image = reader.result?.toString().split(',')[1];

//       if (base64Image) {
//         try {
//           setRouterLoader(true);
//           const response = await axios.post(
//             'https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo',
//             { image: base64Image },
//             {
//               headers: {
//                 "Content-Type": 'application/json',
//               },
//             }
//           );

//           localStorage.setItem('DemoData', JSON.stringify(response.data.data));
//           router.push(`/analysis/demographics`);
//         } catch (error) {
//           if (axios.isAxiosError(error)) {
//             console.log('Error Response:', error);
//             setRouterLoader(false);
//             setVideoError('An error occurred while processing the image. Please try again.');
//           } else {
//             console.log('Unexpected Error:', error);
//           }
//         }
//       }
//     };

//     reader.readAsDataURL(selectedPhoto);
//   }
// }