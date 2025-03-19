import React from 'react';
import { PercentageCircle } from './PercentageCircle';

type confidenceDisplayProps = {
    currentSelectedCategory?: {
        key: string;
        value: number
    };
}


export const ConfidenceDisplay = ({currentSelectedCategory}:confidenceDisplayProps) => {

return (
    <div className="fadeRight w-[45%] 900Brk:block hidden 1150Brk:w-[58%] border-[1px] border-t-black bg-[#f3f3f4] p-4 relative">
    <span>A.I. CONFIDENCE</span>
    <div className="circleContainer absolute bottom-5 right-5">
    <PercentageCircle currentSelectedCategory={currentSelectedCategory as keyof typeof currentSelectedCategory}></PercentageCircle>
    </div>
  </div>
)}

