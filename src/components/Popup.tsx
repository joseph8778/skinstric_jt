import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

type PopupProps = {
  popupType?: string,
  displayTime?: number;
  popupMsg?: string,
  setShowPopup: (value: boolean) => void;
};

export const Popup = ({
  popupType = 'location_error',
  displayTime = 3,
  popupMsg = '',
  setShowPopup,
}: PopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    gsap.set(".progressBar", { width: "100%" });
    gsap.killTweensOf('.progressBar')
    if (timeline.current) timeline.current.kill()
    
    timeline.current = gsap.timeline()    

    timeline.current.fromTo(
      popupRef.current,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.5, ease: 'back.inOut' }
    )
    .to(
      ".progressBar",
      { width: "0%", duration: displayTime, ease: "linear" },
      "-=0.2",
    )
    .add(hidePopup)
  }, [popupType]);
  
  const hidePopup = () => {
    gsap.to(popupRef.current, {
      x: "100%",
      opacity: 0,
      duration: 0.5,
      ease: 'back.inOut',
      onComplete: () => setShowPopup(false)
    });
  };
  
  const popupText: Record<string, string> = {
    location_error: "Select from location dropdown for collecting weather data",
    name_error: 'Please enter a valid name.',
    number_error: 'No numbers allowed in name',
    loading_Data: 'Adding you to our list...'
  }

  const message = popupMsg || popupText[popupType] || popupText['location_error']; 

  return (
    <div
      className="popup overflow-hidden absolute p-5 top-0 right-0 z-10"
      onMouseEnter={() => timeline.current?.pause()}
      onMouseLeave={() => timeline.current?.resume()}
    >
      <div
        ref={popupRef}
        onClick={() => {hidePopup(); }}
        className="w-[365px] h-[82px] p-2 border-t-4 border-black flex items-center shadow-lg relative bg-white cursor-pointer overflow-hidden"
      >
        <div
          className="w-8 h-8 -rotate-45 bg-black relative ml-2"
        >
          <div className="absolute text-white font-bold text-lg right-1/2 top-1/2 translate-x-1/2 translate-y-[-50%] rotate-45">
            X
          </div>
        </div>
        <div className="text-[15px] font-medium text-gray-500 w-3/5 max-w-full max-h-full text-start ml-8 text-ellipsis" aria-live="assertive">
          {message}
        </div>
        <div className="progressBar absolute w-full h-1 bg-gray-200 bottom-0 left-0"></div>
      </div>
    </div>
  );
};
