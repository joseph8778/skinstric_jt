import React, { useEffect, useState } from 'react';

type inputProps = {
  focusText: string,
  topText: string,
  placeholderText: string,
  setInput: (value: string) => void,
  setPage: (value: number) => void,
  sendData: (value: string) => void,
  pageNum: number,
  value: string,
  setShowPopup: (bool: boolean, popType: string) => void,
}


export const LocInput = ({
  value = '',
  sendData,
  setInput,
  setShowPopup,
  pageNum,
  placeholderText = 'Introduce yourself',
  focusText = 'INTRODUCE YOURSELF',
  topText = 'CLICK TO TYPE',
}: inputProps) => {
  const [isFocused, setIsFocused] = useState(false);


  useEffect(() => {
    let autocomplete: google.maps.places.Autocomplete | null = null;
    const inputElement = document.querySelector(".location_input") as HTMLInputElement;

      if (inputElement) {
        autocomplete = new google.maps.places.Autocomplete(inputElement, {
          types: ['geocode'],
        });
        
        
     
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete!.getPlace();
        if (place && place.formatted_address) {
          const lat = place.geometry?.location?.lat()
          const lng = place.geometry?.location?.lng()
          console.log('setting location ' + lat, lng)
          if (lat !== undefined && lng !== undefined) {
               
        localStorage.setItem('latitude', lat.toString());
        localStorage.setItem('longitude', lng.toString());
        localStorage.setItem('Location_Name', place.formatted_address.toString());
        
          setInput(place.formatted_address);
          sendData(place.formatted_address)
        
        }
        } else {
          console.log('Select place from dropdown')
          setShowPopup(true, 'location_error')
        }
      });

    }


    return () => {
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    };

    
  }, [pageNum, setInput, ]);



  return (
    <> 
    <div id='inputContainer' className="group text-center pb-10">
    {isFocused || value.length > 0 ? ( <p className="font-roobert text-[clamp(.65rem,2vw,0.875rem)] opacity-35 ">{focusText}</p>) : (<p className="font-roobert text-[clamp(.65rem,2vw,0.875rem)] opacity-35 ">{topText}</p>)}
      <input
        type="text"
        placeholder={isFocused && pageNum === 2 ? 'Enter a location' : placeholderText}
        style={{ width: "clamp(16rem, 90vw, 24rem)" }}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {setIsFocused(false)}}
        className={`textMount peer ${pageNum === 1 ? "main_input" : "location_input"} placeholder-gray-900 bg-transparent border-b-[1px] border-black outline-none font-roobert font-[400] -tracking-[5] h-20 text-[clamp(1.5rem,13vw,3rem)] text-center`}
        />
    </div>
    </>
  );
};
