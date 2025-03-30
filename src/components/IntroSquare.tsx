import React from 'react';

type introSqrProps = {
    maxSize?: string,
    minSize?: string,
    clampVW?: string
    startVisible: boolean,
}


export const IntroSquare = ({maxSize = '360', minSize = '140', startVisible = false, clampVW = '40'}:introSqrProps) => {

return (
    <div className="square introSquare absolute -rotate-45" style={{    
        width: `clamp(${minSize}px, ${clampVW}vw, ${maxSize}px)`, 
        height: `clamp(${minSize}px, ${clampVW}vw, ${maxSize}px)`,
        backgroundSize: startVisible
        ? "1px 100%, 100% 1px, 1px 100%, 100% 1px"
        : "1px 0%, 0% 1px, 1px 0%, 0% 1px",
    }}/>
)}

