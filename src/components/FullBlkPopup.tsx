'use client';

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type ChecklistItem = {
  title: string;
  description: string;
};

type FullBlkPopupProps = {
  title?: string;
  checklistItems?: ChecklistItem[];
  cancelButtonText?: string;
  actionButtonText?: string;
  onCancel: () => void;
  onAction: () => void;
  onComplete: () => void
};

export const FullBlkPopup = ({
  title = "Please ensure your selfie has:",
  checklistItems = [
    { title: "Neutral Expression", description: "Smiling may distort wrinkles" },
    { title: "Frontal Pose", description: "Take the picture from arm's length at eye level" },
    { title: "Adequate Lighting", description: "Avoid harsh downlighting; aim for soft light" },
  ],
  cancelButtonText = "Cancel",
  actionButtonText = "Upload",
  onCancel,
  onAction,
  onComplete
}: FullBlkPopupProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      containerRef.current,
      { clipPath: "inset(0% 100% 99% 0%)" },
      { clipPath: "inset(0% 0% 99% 0%)", ease: "power2.easeInOut", duration: 0.2 }
    );
    tl.to(containerRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.5,
      ease: "power3.easeInOut",
    });
    tlRef.current = tl;
  }, []);

  const handleClose = () => {
    if (tlRef.current) {
      tlRef.current.reverse();
      tlRef.current.eventCallback("onReverseComplete", () =>{ onComplete();}
    );
    } else {
      onCancel();
    }
  };

  return (
    <div ref={wrapperRef} className="fixed inset-0 flex items-center justify-center z-[100] overflow-hidden ">
      <div ref={containerRef} className="w-[432px] h-[353px] bg-black text-white flex flex-col shadow-lg">
        <div className="h-[15%] flex items-center font-roobert p-4 border-b border-gray-600">
          {title}
        </div>
        <div className="h-[70%] flex flex-col justify-center p-4 border-b border-gray-600">
          <ul className="space-y-3">
            {checklistItems.map((item, index) => (
              <li key={index} className="flex flex-col">
                <div className="flex items-center">
                  <span className="w-2 h-2 border border-white rotate-45 mr-4" aria-hidden="true" />
                  {item.title}
                </div>
                <p className="pl-6 text-gray-500 text-sm">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-[15%] flex items-center justify-end p-4 space-x-6">
          <button onClick={() => {handleClose(); onCancel()}}>{cancelButtonText}</button>
          <button onClick={() => {handleClose(); onAction()}} className="px-4 py-1">
            {actionButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullBlkPopup;
