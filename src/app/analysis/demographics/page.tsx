'use client';

import { CategorySelector } from "@/components/CategorySelector";
import { ConfidenceDisplay } from "@/components/ConfidenceDisplay";
import { DemoSelector } from "@/components/DemoSelector";
import { Header } from "@/components/Header";
import { LargeTitle } from "@/components/LargeTitle";
import { NavBtn } from "@/components/NavBtn";
import { PageLoader } from "@/components/PageLoader";
import { Popup } from "@/components/Popup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { produce } from "immer";
import { useEffect, useMemo, useRef, useState } from "react";

export default function DemographicsPage() {
  const rawData = localStorage.getItem('DemoData');
  const [pageLoader, setPageLoader] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [ShowPopup, setShowPopup] = useState(true);

  interface DemoData {
    race: Record<string, number>;
    gender: Record<string, number>;
    age: Record<string, number>;
  }

  const [demoData, setDemoData] = useState<DemoData | null>(null);

  useEffect(() => {
    try {
      const parsedData = rawData ? JSON.parse(rawData) : null;
      setDemoData(parsedData);
    } catch (error) {
      setPageLoader(true);
      console.error("Invalid JSON data:", error);
    }
  }, [rawData]);
  
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
    if (!demoData) {
      console.log('loading')
      return { race: [], gender: [], age: [] };
    } 
    
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
    if (demoData) {
      setSelectedCategories((prev) => ({
        race:
          prev.race ||
          (sortedData.race.length > 0
            ? { key: sortedData.race[0][0], value: sortedData.race[0][1] }
            : {key: 'NO DATA' , value: 0}),
        gender:
          prev.gender ||
          (sortedData.gender.length > 0
            ? { key: sortedData.gender[0][0], value: sortedData.gender[0][1] }
            : {key: 'NO DATA' , value: 0}),
        age:
          prev.age ||
          (sortedData.age.length > 0
            ? { key: sortedData.age[0][0], value: sortedData.age[0][1] }
            : {key: 'NO DATA' , value: 0}),
      }));
    }
  }, [demoData, sortedData]);
  


useEffect(() => {
  if (sortedData[selectedDemo].length > 0 && !selectedCategories[selectedDemo]) {
    setSelectedCategories((prev) =>
      produce(prev, (draft) => {
        draft[selectedDemo] = sortedData[selectedDemo][0]
          ? { key: sortedData[selectedDemo][0][0], value: sortedData[selectedDemo][0][1] }
          : null;
      })
    );
  }

}, [selectedDemo, sortedData, selectedCategories, demoData]);

const currentSelectedCategory = selectedCategories[selectedDemo];

  const resetCategories = () => {
    setSelectedCategories({
      race: sortedData.race.length > 0 ? { key: sortedData.race[0][0], value: sortedData.race[0][1] } : null,
      gender: sortedData.gender.length > 0 ? { key: sortedData.gender[0][0], value: sortedData.gender[0][1] } : null,
      age: sortedData.age.length > 0 ? { key: sortedData.age[0][0], value: sortedData.age[0][1] } : null,
    });
  }

  return (
    <>
      {ShowPopup && <Popup popupMsg="Select the correct categories according to your demographics." setShowPopup={setShowPopup}/>}
      {pageLoader ? (
        <PageLoader>No skin data available, please revert back to previous page.</PageLoader>
      ) : (
        <>
          <Header blackBtn="CONSULT CHEMIST" />
          <main className="relative mb-4">
              <LargeTitle/>
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
                resetCategories={resetCategories}
              />
            </div>
          </main>

          <footer className="
          relative hidden 900Brk:flex ">
            <NavBtn direction="left" backButton />
            <div className="flex gap-3">
              <button
                onClick={() => resetCategories()}
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
