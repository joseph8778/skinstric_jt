import React from 'react';

type squareProps = {
    size: 'big' | 'medium' | 'small'
}

export const BgSquare = ({size = 'small'}: squareProps) => {
    const squareType = {
        big: '300px, 60vw, 440px',
        medium: '260px, 50vw, 400px',
        small: '220px, 40vw, 360px',
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
    
return (
    <div className={`square absolute -z-10 ${opacity[size]} animate-spin `} style={{
        width: `clamp(${squareType[size]})`, 
        height: `clamp(${squareType[size]})`, 
        animationDuration: animationTime[size],
        backgroundSize: "1px 100%, 100% 1px, 1px 100%, 100% 1px"
    }} />
)}



