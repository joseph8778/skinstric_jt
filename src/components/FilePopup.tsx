import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Popup } from "./Popup";

type fileProps = {
  setPopup: (value: boolean) => void;
  setSelectedPhoto: (value: File) => void;
};

export const FilePopup = ({ setPopup, setSelectedPhoto }: fileProps) => {
  const containerRef = useRef(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showErrorPopup, setshowErrorPopup] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      containerRef.current,
      { clipPath: "inset(0% 100% 75% 0%)" },
      { clipPath: "inset(0% 0% 75% 0%)", ease: "power2.inOut", duration: 0.5 }
    );

    tl.to(containerRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1,
      ease: "power3.inOut",
    });

    tlRef.current = tl;
  }, []);

  const handleClose = () => {
    if (tlRef.current) {
      tlRef.current.reverse();
      tlRef.current.eventCallback("onReverseComplete", () => setPopup(false));
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      console.log('Selected File:', file);
      setSelectedPhoto(file)
      handleClose();
    } else {
      setshowErrorPopup(true)
    }
  };

  const checklistItems = [
    { title: "Neutral Expression", description: "Smiling may distort wrinkles" },
    { title: "Frontal Pose", description: "Take the picture from arm's length at eye level" },
    { title: "Adequate Lighting", description: "Avoid harsh downlighting; aim for soft light" },
  ];

  return (
  <>
    {showErrorPopup && <Popup setShowPopup={setshowErrorPopup} popupMsg="Invalid file type, please select a photo." />}
    <div ref={containerRef} className="fixed inset-0 flex items-center justify-center z-[100] overflow-hidden">
      <div className="w-[432px] h-[353px] bg-black text-white flex flex-col shadow-lg">
        <div className="h-[15%] flex items-center font-roobert p-4 border-b border-gray-600">
          Please ensure your selfie has:
        </div>
        <div className="h-[70%] flex flex-col justify-center p-4 border-b border-gray-600">
          <ul className="space-y-3">
            {checklistItems.map((item, index) => (
              <li key={index} className="flex flex-col">
                <div className="flex items-center">
                  <span className="size-[.5rem] border border-white rotate-45 mr-4" aria-hidden="true" />
                  {item.title}
                </div>
                <p className="pl-6 text-gray-500 text-sm">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-[15%] flex items-center justify-end p-4 space-x-6">
          <button onClick={handleClose}>Cancel</button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-1"
            >
            Upload
          </button>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        />
    </div>
  </>
  );
};

export default FilePopup;
