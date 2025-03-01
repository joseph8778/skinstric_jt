import React, { useState } from 'react';

type inputProps = {
  focusText: string,
  topText: string,
  placeholderText: string,
  setInput: (value: string) => void,
  setPage: (value: number) => void,
  setShowPopup: (bool: boolean, popType: string) => void,
  pageNum: number,
  value: string,
 
}

export const NameInput = ({
  value = '',
  setInput,
  setPage,
  setShowPopup,
  pageNum,
  placeholderText = 'Introduce yourself',
  focusText = 'INTRODUCE YOURSELF',
  topText = 'CLICK TO TYPE'
}: inputProps) => {
  
  const [isFocused, setIsFocused] = useState(false);
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (/[0-9]/.test(value)) {
        setShowPopup(true, 'number_error')
        return
      }
      if (pageNum === 1 && value.length > 0) {
        setPage(2);
        setShowPopup(false, '')
      } else if (value.length < 1) {
        setShowPopup(true, 'name_error')
      }
    }
  };

  return (
    <div className="group text-center pb-10">
      {isFocused || value.length > 0 ? ( <p className="font-roobert text-[clamp(.65rem,2vw,0.875rem)] opacity-35 ">{focusText}</p>) : (<p className="font-roobert text-[clamp(.65rem,2vw,0.875rem)] opacity-35 ">{topText}</p>)}

      <input
        type="text"
        placeholder={placeholderText}
        style={{ width: "clamp(16rem, 90vw, 24rem)" }}
        onChange={(event) => { setInput(event.target.value) }}
        onKeyDown={handleKeyDown}
        value={value}
        maxLength={35}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`textMount peer ${pageNum === 1 ? "main_input" : "location_input"} placeholder-gray-900 bg-transparent border-b-[1px] border-black outline-none font-roobert font-[400] -tracking-[5] h-20 text-[clamp(1.5rem,13vw,3.5rem)] text-center`}
      />
    </div>
  );
};
