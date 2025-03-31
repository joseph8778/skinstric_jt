import React from 'react';

type introSqrProps = {
    maxSize?: string,
    minSize?: string,
    opacity?: number,
    clampVW?: string
    startVisible: boolean,
    children?: React.ReactNode;
}


export const IntroSquare = ({maxSize = '360', minSize = '140', startVisible = false, clampVW = '40', opacity = 1, children}:introSqrProps) => {

return (
    <div className="square introSquare absolute -rotate-45" style={{    
        width: `clamp(${minSize}px, ${clampVW}vw, ${maxSize}px)`, 
        height: `clamp(${minSize}px, ${clampVW}vw, ${maxSize}px)`,
        opacity: opacity,
        backgroundSize: startVisible
        ? "1px 100%, 100% 1px, 1px 100%, 100% 1px"
        : "1px 0%, 0% 1px, 1px 0%, 0% 1px",
    }}>
        {children}
    </div>
)}

