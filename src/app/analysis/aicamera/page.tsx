'use client'
import { BgSquare } from "@/components/BgSquare";
import { IntroSqrAnim } from "@/components/IntroSqrAnim";

export default function aiCameraPage() {
    return (
        <>
        <IntroSqrAnim />
        <div className="flex justify-center items-center w-full h-full">
        <span className="font-roobert font-semibold text-xs">SETTING UP CAMERA...</span>
        <BgSquare size="big"></BgSquare>
        <BgSquare size="medium"></BgSquare>
        <BgSquare size="small"></BgSquare>
        </div>
        </>
    )
}
