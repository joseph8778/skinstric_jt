import React from 'react';

type squareProps = {
    size?: 'big' | 'medium' | 'small'
    customSize?: number
    spinSpeed?: number
    customOpacity?: number
}

export const BgSquare = ({size = 'small', customSize, spinSpeed, customOpacity}: squareProps) => {
    const squareType = {
        big: '260px, 60vw, 380px',
        medium: '200px, 50vw, 340px',
        small: '160px, 40vw, 300px',
    }
    const animationTime = {
        big: '140s',
        medium: '150s',
        small: '160s'
    }
    const opacity = {
        big: 'opacity-25',
        medium: 'opacity-50',
        small: ''
    }
    const finalSize = customSize ? (`clamp(${customSize - 40}px, ${customSize * 0.1}vw, ${customSize + 40}px)`) : (`clamp(${squareType[size]})`)

    const finalTime = spinSpeed ? (`${spinSpeed}s`) : (animationTime[size])

    const finalOpacity = customOpacity ? (`opacity-${customOpacity}`) : (opacity[size])
    
return (
    <div className={`square absolute -z-10 ${finalOpacity} animate-spin `} style={{
        width: finalSize, 
        height: finalSize, 
        animationDuration: finalTime,
        backgroundSize: "1px 100%, 100% 1px, 1px 100%, 100% 1px"
    }} />
)}



