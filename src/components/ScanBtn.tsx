'use client'

import Image from "next/image"
import { BgSquare } from "./BgSquare"
import shutter from '@/assets/shutter.svg'
import gallery from '@/assets/gallery-icon.svg'
import { useRouter } from "next/navigation"


type ScanBtnProps = {
    scanType: 'Camera' | 'Gallery',
    setPopup: (value: boolean) => void,
    sqrSize?: number,
    wrapperSize?: string,
}

export const ScanBtn = ({scanType = 'Camera', setPopup, sqrSize = 200,}:ScanBtnProps) => {
    const router = useRouter()
    const centerImg = {
        Camera: shutter,
        Gallery: gallery
    }
    const popup = {
        Camera: false,
        Gallery: true
    }

    return (
        <div className={`buttonMount w-full h-full relative flex justify-center items-center`}>
    <BgSquare spinSpeed={75} customSize={sqrSize} />
    <BgSquare spinSpeed={125} customSize={sqrSize - 20}/>
    <BgSquare spinSpeed={175} customSize={sqrSize - 40}/>


    <div className="relative" style={{width:`clamp(16px, 14vw, 8rem)`}}>
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
        ( <div className="absolute line_Container  flex justify-center top-1/2 right-1/2 items-center -z-20 size-44 ml-1 ">
            <div className="absolute origin-top-right top-0 w-full border-t-[.1px] border-black -rotate-45">
                <div className="absolute -bottom-1 -left-2 rounded-full border-black border-[0.5px] size-2"/>
            </div>
            <span className="absolute bottom-0 right-[20%] origin-top-right w-[160px] text-[14px] font-[400] textMount "> ALLOW AI TO ACCESS CAMERA</span>
            </div>)
:
(    <div className="absolute line_Container  flex justify-center bottom-1/2 left-1/2 items-center -z-20 size-44 mr-1">
    <div className="absolute origin-bottom-left bottom-0 w-full border-t-[.1px] border-black -rotate-[49deg]">
    <div className="absolute -top-1 -right-2 rounded-full border-black border-[0.5px] size-2"/>
    </div>
    <span className="absolute -top-3 left-[28%] origin-top-right w-[160px] text-[14px] font-[400] textMount "> ALLOW AI TO ACCESS GALLERY</span>
    </div> )

}
    </div>
</div>
    )
}