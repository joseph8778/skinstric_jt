import React, { useEffect, useRef, useState } from 'react';

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


    const inputRef = useRef<HTMLInputElement>(null);  // Reference to the input element

    // Initialize the Google Maps Autocomplete API only when pageNum is 2
    useEffect(() => {
        if (pageNum === 2 && window.google && inputRef.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
                types: ['geocode'], // Limit the autocomplete to address input (geocode)
            });

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place && place.formatted_address) {
                    setInput(place.formatted_address); 
                }
            });

            return () => {
                if (autocomplete) {
                    google.maps.event.clearListeners(autocomplete, 'place_changed');
                }
            };
        }
    }, [pageNum]);  

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (pageNum === 1) {
                setPage(2);  
            } else {
                sendData(); 
            }
        }
    };

    return (
        <div className="group text-center pb-10">
            <p className="font-roobert text-[clamp(.65rem,2vw,0.875rem)] opacity-35 group-focus-within:hidden">{topText}</p>
            <p className="font-roobert text-[clamp(.65rem,2vw,0.875rem)] opacity-35 hidden group-focus-within:block">{focusText}</p>
            <input
                ref={inputRef} 
                type="text"
                placeholder={isFocused && pageNum === 2 ? 'Enter a location' : placeholderText}
                style={{ width: "clamp(16rem, 90vw, 24rem)" }}
                onChange={(event) => { setInput(event.target.value) }}
                onKeyDown={handleKeyDown} 
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}

                
                className={`textMount peer ${pageNum === 1 ? ("main_input") : ('location_input')} placeholder-gray-900 bg-transparent border-b-[1px] border-black outline-none font-roobert font-[400] -tracking-[5] h-20 text-[clamp(1.5rem,13vw,3.5rem)] text-center`}
            />
        </div>
    );
};
