import React, { useEffect, useState } from 'react';

type PercentageCircleProps = {
  currentSelectedCategory?: {
    key: string 
    value: number 
  };
  size?: string;
  bgColor?: string;
  borderCol?: string;
  bgBorderCol?: string;
  textColor?: string;
};

export const PercentageCircle = ({ currentSelectedCategory, size = "256", bgColor = 'bg-[#f3f3f4]', borderCol = 'black', bgBorderCol='lightgrey', textColor  }: PercentageCircleProps) => {
  const [animPerc, setAnimPerc] = useState(0);

  useEffect(() => {
    if (!currentSelectedCategory ) return;

    setAnimPerc(0); 

    const target = currentSelectedCategory.value * 360;
    const interval = setInterval(() => {
      setAnimPerc((prev) => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + 5; 
      });
    }, 10); 

    return () => clearInterval(interval); 
  }, [currentSelectedCategory]);

  return (
    <div
      className={`900Brk:size-[306px]   rounded-full p-1 group`}
      style={{
        background: `conic-gradient(${borderCol} ${animPerc}deg, ${bgBorderCol} 0deg)`,
        transform: 'scaleX(-1)',
        height: `${size}`,
        width: `${size}`,
        color: textColor
      }}
    >
      <div className={`w-full h-full   rounded-full ${bgColor}  flex items-center justify-center`} style={{ transform: 'scaleX(-1)' }}>
        <span className="text-[35px]">
          {(currentSelectedCategory ? currentSelectedCategory.value * 100 : 0).toFixed(0)}%
        </span>
      </div>
    </div>
  );
};
