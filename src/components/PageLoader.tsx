import React, { ReactNode } from 'react';
import { BgSquare } from './BgSquare';

type PageLoaderProps = {
children?: ReactNode;
customSize?: number;
}


export const PageLoader = ({children, customSize}:PageLoaderProps) => {

const sizes = customSize ? [customSize, 
  customSize + 40, customSize + 80] : ['big', 'medium', 'small'];

return (
<div className="flex justify-center items-center w-screen h-screen">
        <span className="font-roobert font-semibold text-xs">{children}</span>
      {sizes.map((currentSize, i) => (
        <BgSquare key={i}
        spinSpeed={typeof currentSize === 'number' ? currentSize * 1.25 : undefined} 
        customSize={typeof currentSize === 'number' ? currentSize : undefined} size={typeof currentSize === 'number' ? undefined : currentSize as 'big' | 'medium' | 'small'} />
      ))
      }
      </div>
)}

