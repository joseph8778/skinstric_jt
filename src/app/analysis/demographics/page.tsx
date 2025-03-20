'use client';

import { CategorySelector } from "@/components/CategorySelector";
import { ConfidenceDisplay } from "@/components/ConfidenceDisplay";
import { DemoSelector } from "@/components/DemoSelector";
import { Header } from "@/components/Header";
import { NavBtn } from "@/components/NavBtn";
import { PageLoader } from "@/components/PageLoader";
import { Popup } from "@/components/Popup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

export default function DemographicsPage() {
  const searchParams = useSearchParams();
  const rawData = searchParams.get('data');
  const [pageLoader, setPageLoader] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);

  let demoData = null;

  try {
    demoData = rawData ? JSON.parse(rawData) : null;
  } catch (error) {
    console.error("Invalid JSON data:", error);
    setPageLoader(true);
  }

  const animRef = useRef<gsap.core.Animation[] | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  
  useGSAP(() => {
    const context = gsap.context(() => {
      animRef.current = [];
      animRef.current?.push(
        gsap.fromTo(
          ".textMount",
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1, delay: 0.2 }
        )
      );

      const tl = gsap.timeline();
      tl.fromTo(
        '.fadeRight',
        { clipPath: "inset(0% 100% 99.5% 0%)" },
        { clipPath: "inset(0% 0% 99.5% 0%)", ease: "power2.inOut", duration: 0.3, stagger: .05 }
      );
  
      tl.to('.fadeRight', {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: .6,
        ease: "power3.inOut",
        stagger: .1
      });
  
      tlRef.current = tl;
 
  })
  return () => {
    context.revert();
  };
});



  const sortedData = useMemo(() => {
    if (!demoData || typeof demoData !== "object") {
      setPageLoader(true);
    }
    if (!demoData) return { race: [], gender: [], age: [] };
    
    return {
      race: Object.entries(demoData.race as Record<string, number>).sort((a, b) => b[1] - a[1]),
      gender: Object.entries(demoData.gender as Record<string, number>).sort((a, b) => b[1] - a[1]),
      age: Object.entries(demoData.age as Record<string, number>).sort((a, b) => b[1] - a[1]),
    };
  }, [demoData]);

  const transformedData = Object.fromEntries(
    Object.entries(sortedData).map(([key, values]) => [
      key,
      values.map(([k, v]) => ({ key: k, value: v })),
    ])
  );

  const [selectedDemo, setSelectedDemo] = useState<keyof typeof sortedData>('race');
  const [selectedCategories, setSelectedCategories] = useState({
    race: sortedData.race.length > 0 ? { key: sortedData.race[0][0], value: sortedData.race[0][1] } : null,
    gender: sortedData.gender.length > 0 ? { key: sortedData.gender[0][0], value: sortedData.gender[0][1] } : null,
    age: sortedData.age.length > 0 ? { key: sortedData.age[0][0], value: sortedData.age[0][1] } : null,
  });

  useEffect(() => {
    if (sortedData[selectedDemo].length > 0 && !selectedCategories[selectedDemo]) {
      setSelectedCategories((prev) => ({
        ...prev,
        [selectedDemo]: {
          key: sortedData[selectedDemo][0][0],
          value: sortedData[selectedDemo][0][1],
        },
      }));
    }
  }, [selectedDemo, sortedData, selectedCategories]);
  const currentSelectedCategory = selectedCategories[selectedDemo];


  return (
    <>
      <Popup popupMsg="Select the correct categories according to your demographics." />
      {pageLoader ? (
        <PageLoader loaderText="No skin data available, please revert back to previous page." />
      ) : (
        <>
          <Header blackBtn="CONSULT CHEMIST" />
          <main className="relative mb-4">
            <div className="w-full flex flex-col h-[20%] justify-start items-start mb-8">
              <h1 className="textMount text-[38px] 520Brk:text-[42px] tracking-tighter">DEMOGRAPHICS</h1>
              <p className="textMount text-[12px] tracking-tighter ml-[4px]">PREDICTED AGE AND RACE</p>
              <div className="visible 900Brk:hidden mt-6 ml-2">
                <NavBtn direction="left" routerLink="/testing" />
              </div>
            </div>

            <div className="w-full h-[60%] 900Brk:h-[20%] flex justify-around gap-4 min-h-[600px]">
              <DemoSelector 
                sortedData={transformedData} 
                setSelectedDemo={setSelectedDemo} 
                setShowMobileCategories={setShowMobileCategories} 
                selectedDemo={selectedDemo} 
                currentSelectedCategory={currentSelectedCategory as keyof typeof currentSelectedCategory} 
                selectedCategories={selectedCategories}/>

              <ConfidenceDisplay currentSelectedCategory={currentSelectedCategory as keyof typeof currentSelectedCategory}/>

              <CategorySelector 
                sortedData={transformedData} 
                setShowMobileCategories={setShowMobileCategories} 
                selectedDemo={selectedDemo} 
                currentSelectedCategory={currentSelectedCategory as keyof typeof currentSelectedCategory} 
                showMobileCategories={showMobileCategories} 
                setSelectedCategories={setSelectedCategories} 
              />
            </div>
          </main>

          <footer className="
          relative hidden 900Brk:flex py-6 items-center justify-between">
            <NavBtn direction="left" routerLink="/testing" />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedCategories({
                    race: sortedData.race.length > 0 ? { key: sortedData.race[0][0], value: sortedData.race[0][1] } : null,
                    gender: sortedData.gender.length > 0 ? { key: sortedData.gender[0][0], value: sortedData.gender[0][1] } : null,
                    age: sortedData.age.length > 0 ? { key: sortedData.age[0][0], value: sortedData.age[0][1] } : null,
                  });
                }}
                className="w-[70px] h-8 bg-black text-white flex items-center justify-center hover:bg-slate-900"
              >
                <span className="text-[10px] font-roobert font-semibold">Reset</span>
              </button>
              <button className="w-[70px] h-8 bg-black text-white flex items-center justify-center hover:bg-slate-900">
                <span className="text-[10px] font-roobert font-semibold">Confirm</span>
              </button>
            </div>
          </footer>
        </>
      )}
    </>
  );
}
