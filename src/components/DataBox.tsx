import React, { ReactNode } from 'react'

type DataBoxProps = {
    title?: string;
    children?: ReactNode;
    info?: string | number
    hgt?: number;
    wdt?: number
}

export const DataBox = ({title = 'Title', children, info = 'Info', hgt = 200, wdt = 309}:DataBoxProps) => {
    return (
            <div className={`border border-t-black bg-[#f3f3f4] flex flex-col items-center justify-center`}
            style={{ width: `${wdt}px`, height: `${hgt}px`}}
            >
            <h1 className='w-full h-[25%] flex items-center px-3'>{title}</h1>
            <div className="w-full h-[50%]">
            {children}
            </div>
            <span className='w-full h-[25%] flex items-center justify-end px-3'>{info}</span>    
          </div>
    )
}