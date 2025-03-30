import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type PopupProps = {
  popupText?: string;
  showPopUp: (value: boolean) => void;
  confirmBtn?: string;
  denyBtn?: string;
  confirmFunc?: () => void;
  confirmText?: string;
  parentClassName?: string;
};

export const ExitPopup = ({
  popupText = "You are about to leave analysis, are you sure?", confirmBtn = "LEAVE", denyBtn = 'STAY', confirmFunc, confirmText, showPopUp, parentClassName = ''
}: PopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [text, setText] = useState(popupText);
  const [leaveState, setLeaveState] = useState(false);

  useGSAP(() => {
    const context = gsap.context(() => {
      if (popupRef.current) {
        gsap.fromTo(
          popupRef.current,
          { x: "-100%", opacity: 0 },
          { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
        );
      }
      
    })
    return () => {
      context.revert()
    }
  }, []);

  const handleStay = (delayTime?: number) => {
    if (popupRef.current) {
      gsap.to(popupRef.current, {
        x: "-100%",
        opacity: 0,
        delay: delayTime,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          setIsVisible(false)
          showPopUp(false)
         
        },
      });
    }
  };
  
  const handleLeave = () => {
    setText(confirmText || 'Sad to see you go...') 
    setLeaveState(true)
    handleStay(2)
  }

  if (!isVisible) return null;

  return (
    <div ref={popupRef} className={`exit__popup absolute top-[48px] left-[32px] ${parentClassName}`}>
      <div className=" h-[104px] flex flex-col shadow-lg relative bg-[#1A1B1C] z-50"
      style={{ width: "clamp(200px, 50vw, 288px)" }}
      >
        <div className="p-3 text-[12px] font-[500] text-[rgb(252,252,252)] w-[90%] h-[65%] text-start">
          {text.toUpperCase()}
        </div>
        <div className="button__container text-white border-t-2 w-[100%] h-[35%] flex items-center justify-end p-4">
          {!leaveState ? (
        <>
        <button
          onClick={() => {
            confirmFunc?.()
            handleLeave()}}
          className="text-[9px] font-[500] tracking-tighter cursor-pointer hover:opacity-40 mr-10">
            {confirmBtn}
          </button>
          <button
            className="text-[9px] font-[500] tracking-tighter cursor-pointer hover:opacity-40"
            onClick={() => {
              
              handleStay()}}
            >
             {denyBtn}
          </button>
          </>
          ) : ('...')}
        </div>
      </div>
    </div>
  );
};