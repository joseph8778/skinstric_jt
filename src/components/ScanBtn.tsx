'use client'

import Image from "next/image"
import { BgSquare } from "./BgSquare"
import shutter from '@/assets/shutter.svg'
import gallery from '@/assets/gallery-icon.svg'
import { useRouter } from "next/navigation"


type ScanBtnProps = {
    scanType: 'Camera' | 'Gallery',
    setPopup: (value: boolean) => void,
}

export const ScanBtn = ({scanType = 'Camera', setPopup}:ScanBtnProps) => {
    const centerImg = {
        Camera: shutter,
        Gallery: gallery
    }
    const popup = {
        Camera: false,
        Gallery: true
    }
    
    const router = useRouter()
    return (
        <div className="buttonMount relative flex justify-center items-center">
    <BgSquare spinSpeed={75} customSize={240}/>
    <BgSquare spinSpeed={125} customSize={220}/>
    <BgSquare spinSpeed={175} customSize={200}/>
    
    <div className="w-32 h-32 relative">
    <Image
    onClick={() => {
        if( scanType === 'Camera') {
            router.push('/analysis/aicamera')
        } else setPopup(popup[scanType])
    }}
     className="w-full h-full hover:scale-75 duration-500 cursor-pointer transition-all ease-in-out" src={centerImg[scanType]}  alt="shutterImage"/>

    {
scanType === 'Camera'
?
(<div className="relative line_Container overflow-visible">
        <div className="absolute origin-center -bottom-[25] -left-[105] -z-5 w-[150px] border-t-[.1px] border-black -rotate-45"></div>
    <span className="absolute w-[160px] -bottom-[135] -left-[155] text-[14px] font-[400] textMount ">ALLOW AI TO ACCESS GALLERY</span>
    </div>)
:
(    <div className="relative line_Container overflow-visible">
    <div className="absolute origin-center bottom-[150] left-[85] -z-5 w-[150px] border-t-[.1px] border-black -rotate-45"></div>
    <span className="absolute w-[160px] bottom-[195] left-[225] text-[14px] font-[400] textMount ">ALLOW AI TO SCAN YOUR FACE</span>
    </div> )

}
    </div>   
    </div>
    )
}