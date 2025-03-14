import React, { useEffect, useState } from 'react';

type PercentageCircleProps = {
  currentSelectedCategory?: {
    value: number;
  };
};

export const PercentageCircle = ({ currentSelectedCategory }: PercentageCircleProps) => {
  const [animPerc, setAnimPerc] = useState(0);

  useEffect(() => {
    if (!currentSelectedCategory) return;

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
      className="absolute bottom-5 right-5 size-[256px] 1150Brk:size-[306px] rounded-full p-1"
      style={{
        background: `conic-gradient(black ${animPerc}deg, lightgrey 0deg)`,
        transform: 'scaleX(-1)',
      }}
    >
      <div className="w-full h-full rounded-full bg-[#f3f3f4] flex items-center justify-center" style={{ transform: 'scaleX(-1)' }}>
        <span className="text-[35px]">
          {(currentSelectedCategory ? currentSelectedCategory.value * 100 : 0).toFixed(0)}%
        </span>
      </div>
    </div>
  );
};
