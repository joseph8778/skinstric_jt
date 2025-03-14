import React from 'react';
import { BgSquare } from './BgSquare';

type PageLoaderProps = {
loaderText?: string
}


export const PageLoader = ({loaderText = 'Loading...'}:PageLoaderProps) => {

return (
<div className="flex justify-center items-center w-screen h-screen">
        <span className="font-roobert font-semibold text-xs">{loaderText}</span>
        <BgSquare size="big" />
        <BgSquare size="medium" />
        <BgSquare size="small" />
      </div>
)}

