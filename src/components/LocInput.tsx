import React, { useEffect, useState } from 'react';

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

export const LocInput = ({
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
  // New state variable to track the valid place selected from autocomplete
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

  useEffect(() => {
    let autocomplete: google.maps.places.Autocomplete | null = null;

    if (pageNum === 2 && window.google) {
      const inputElement = document.getElementById("loc-input") as HTMLInputElement;
      if (inputElement) {
        autocomplete = new window.google.maps.places.Autocomplete(inputElement, {
          types: ['geocode'],
        });
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete!.getPlace();
          
            
              if (place && place.formatted_address) {
                  setSelectedPlace(place);
                  setInput(place.formatted_address);
                } else {
                    // Reset if the place is not valid
                    setSelectedPlace(null);
                }
 
        });
      }
    }

    return () => {
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [pageNum, setInput]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (pageNum === 1) {
        setPage(2);
      } else {
        console.log(selectedPlace)
        console.log(selectedPlace.formatted_address)
        if (selectedPlace && selectedPlace.formatted_address) {
          sendData();
        } else {
          console.error("Please select a valid address from the suggestions.");
        }
      }
    }
  };

  return (
    <div className="group text-center pb-10">
      <p className="font-roobert text-[clamp(.65rem,2vw,0.875rem)] opacity-35 group-focus-within:hidden">
        {topText}
      </p>
      <p className="font-roobert text-[clamp(.65rem,2vw,0.875rem)] opacity-35 hidden group-focus-within:block">
        {focusText}
      </p>
      <input
        id="loc-input"
        type="text"
        placeholder={isFocused && pageNum === 2 ? 'Enter a location' : placeholderText}
        style={{ width: "clamp(16rem, 90vw, 24rem)" }}
        onChange={(event) => {
        setInput(event.target.value);
        setSelectedPlace(null);
        }}
        onKeyDown={handleKeyDown}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`textMount peer ${pageNum === 1 ? "main_input" : "location_input"} placeholder-gray-900 bg-transparent border-b-[1px] border-black outline-none font-roobert font-[400] -tracking-[5] h-20 text-[clamp(1.5rem,13vw,3rem)] text-center`}
      />
    </div>
  );
};
