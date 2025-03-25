'use client'
import { IntroSqrAnim } from "@/components/IntroSqrAnim";
import CameraAccess from "@/components/CameraAccess";
import { Header } from "@/components/Header";

export default function aiCameraPage() {
    return (
        <>
        <IntroSqrAnim linesAnimDuration={2.5} />
        <main> 
            {/* <PageLoader customSize={300}>
                <div className="flex flex-col justify-center items-center">
                    <Image width={152} height={152} src={shutter} alt="shutterPicture"/>
                    <span className="text-[16px] font-[600] tracking-wide mt-7">SETTING UP CAMERA...</span>

                    <div className="flex flex-col justify-center items-center absolute bottom-24 w-full max-w-[550px] gap-5 font-[400]">
                        <h1 className="text-[16px]">TO GET BETTER RESULTS BE SURE TO HAVE</h1>
                        <h1 className="flex w-full justify-around">
                            <span className="flex justify-start items-center gap-1">
                                <div className="rotate-45 w-[12px] h-[12px] outline-1 outline mr-2"/>
                                NUETRAL EXPRESSION</span>
                            <span className="flex justify-start items-center gap-1">
                                <div className="rotate-45 w-[12px] h-[12px] outline-1 outline mr-2"/>
                                FRONTAL POSE</span>
                            <span className="flex justify-start items-center gap-1">
                                <div className="rotate-45 w-[12px] h-[12px] outline-1 outline mr-2"/>
                                ADEQUATE LIGHTING</span>
                        </h1>
                    </div>
                </div>
            </PageLoader> */}
            <div className="absolute top-0 left-0 z-[100]">
                <Header></Header>
            </div>
            <CameraAccess></CameraAccess>
        
        </main>
        </>
    )
}
