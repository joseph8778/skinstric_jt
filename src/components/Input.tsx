import React, { useState } from 'react';

type inputProps = {
  focusText: string,
  topText: string,
  placeholderText: string,
  setInput: (value: string) => void,
  setPage: (value: number) => void,
  sendData: () => void,
  pageNum: number,
  value: string
}

export const Input = ({
  value,
  sendData,
  setInput,
  setPage,
  pageNum,
  placeholderText = 'Introduce yourself',
  focusText = 'INTRODUCE YOURSELF',
  topText = 'CLICK TO TYPE'
}: inputProps) => {

  
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (pageNum === 1) {
        setPage(2); // Switch to Page 2 when pressing Enter on Page 1
      } else {
        sendData(); // Send data when on Page 2
      }
    }
  };

  return (
    <div className="group text-center pb-10">
      <p className="font-roobert text-[clamp(.65rem,2vw,0.875rem)] opacity-35 group-focus-within:hidden">{topText}</p>
      <p className="font-roobert text-[clamp(.65rem,2vw,0.875rem)] opacity-35 hidden group-focus-within:block">{focusText}</p>

      <input
        type="text"
        placeholder={isFocused && pageNum === 2 ? 'Enter a location' : placeholderText}
        style={{ width: "clamp(16rem, 90vw, 24rem)" }}
        onChange={(event) => { setInput(event.target.value) }}
        onKeyDown={handleKeyDown}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`textMount peer ${pageNum === 1 ? "main_input" : "location_input"} placeholder-gray-900 bg-transparent border-b-[1px] border-black outline-none font-roobert font-[400] -tracking-[5] h-20 text-[clamp(1.5rem,13vw,3.5rem)] text-center`}
      />
    </div>
  );
};
