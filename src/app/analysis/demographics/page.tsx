'use client';

import { Header } from "@/components/Header";
import { NavBtn } from "@/components/NavBtn";
import { PageLoader } from "@/components/PageLoader";
import {PercentageCircle} from "@/components/PercentageCircle";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

export default function TestingPage() {
  const searchParams = useSearchParams();
  const rawData = searchParams.get('data');
  const [pageLoader, setPageLoader] = useState(false);

  let demoData = null;
  try {
    demoData = rawData ? JSON.parse(rawData) : null;
  } catch (error) {
    console.error("Invalid JSON data:", error);
    setPageLoader(true)
  }
  
  const animRef = useRef<gsap.core.Animation[] | null>(null)
  useGSAP(() => {
    const context = gsap.context(() => {
      animRef.current = []
      
      animRef.current?.push(gsap.fromTo(
        ".textMount",
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1, delay: .2 }
      ));
      animRef.current?.push(gsap.from(".fadeRight", { x: "25%", opacity: 0, duration: .75, delay: 0, stagger: .25 }));
    });
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


  const [selectedDemo, setSelectedDemo] = useState<keyof typeof sortedData>('race');

  // Store the selected category for each demo type.
  const [selectedCategories, setSelectedCategories] = useState<{
    [K in keyof typeof sortedData]: { key: string; value: number } | null;
  }>({
    race:
      sortedData.race.length > 0
        ? { key: sortedData.race[0][0], value: sortedData.race[0][1] }
        : null,
    gender:
      sortedData.gender.length > 0
        ? { key: sortedData.gender[0][0], value: sortedData.gender[0][1] }
        : null,
    age:
      sortedData.age.length > 0
        ? { key: sortedData.age[0][0], value: sortedData.age[0][1] }
        : null,
  });

  // When switching demos, if there is no stored category, set it to the first item.
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

  // Convenience alias for the current demo's selected category.
  const currentSelectedCategory = selectedCategories[selectedDemo];

  return (
    <>
      {pageLoader ? (
        <PageLoader loaderText="No skin data available, please revert back to previous page."/>
      ) : (
        <>
          <Header blackBtn="CONSULT CHEMIST" />
          <main className="relative mb-4 ">
            <div className="w-full flex flex-col h-[20%] justify-start items-start mb-8">
              <h1 className="textMount text-[42px] tracking-tighter ">DEMOGRAPHICS</h1>
              <p className="textMount text-[12px] tracking-tighter ml-[4px]">PREDICTED AGE AND RACE</p>
            </div>

            <div className="w-full h-[60%] 900Brk:h-[20%] flex justify-around gap-4 min-h-[600px]">
              {/* Left Section */}
              <div className="fadeRight 900Brk:w-[13%] w-full smallest:w-[40%]  900Brk:h-auto gap-2 flex flex-col justify-start items-center">
                {Object.keys(sortedData).map((key) => (
                  <button
                    key={key}
                    id={`${key}Box`}
                    onClick={() => {
                      setSelectedDemo(key as keyof typeof sortedData);
                    }}
                    className={`w-full 900Brk:h-[20%] h-[33%] text-black font-roobert font-semibold border-[1px] border-t-black ${
                      selectedDemo === key
                        ? 'bg-black text-white hover:bg-[#1e1e1e]'
                        : 'bg-[#f3f3f4] hover:bg-[#d1d1d3]'
                    } flex flex-col justify-between items-start p-2`}
                  >
                    {sortedData[key as keyof typeof sortedData].length > 0 && (
                      <>
                        <span className="text-start text-xs 1150Brk:text-base">
                          {sortedData[key as keyof typeof sortedData][0][0].toUpperCase()}
                        </span>
                        <span className="text-start text-xs 1150Brk:text-base">
                          {key.toUpperCase()}
                        </span>
                      </>
                    )}
                  </button>
                ))}
              </div>

              {/* Middle Section */}
  <div className="fadeRight w-[45%] 900Brk:block hidden 1150Brk:w-[58%] border-[1px] border-t-black bg-[#f3f3f4] p-4 relative">
  <span>A.I. CONFIDENCE</span>
  <PercentageCircle currentSelectedCategory={currentSelectedCategory}></PercentageCircle>
</div>

              

              {/* Right Section */}
              <div className="fadeRight smallest:block w-[60%] 900Brk:w-[55%] 1150Brk:w-[26%] border-[1px] border-t-black bg-[#f3f3f4] flex flex-col justify-start">
                <div className="flex flex-col w-full h-full">
                  <div className="p-3 w-full h-[46px] flex items-center justify-between font-roobert text-[14.5px]">
                    <span>{selectedDemo.toUpperCase()}</span>
                    <span>A.I. CONFIDENCE</span>
                  </div>

                  {sortedData[selectedDemo].length > 0 ? (
                    sortedData[selectedDemo].map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() =>
                          setSelectedCategories((prev) => ({
                            ...prev,
                            [selectedDemo]: { key, value: val },
                          }))
                        }
                        className={`group p-3 w-full h-[46px] flex items-center justify-between transition-colors duration-100 ease-in-out ${
                          currentSelectedCategory?.key === key
                            ? 'bg-black text-white'
                            : 'text-black bg-[#f3f3f4] hover:bg-[#d1d1d3]'
                        }`}
                      >
                        <div className="text-[14px] font-roobert font-medium flex items-center p-1">
                          <span
                            className="size-[.75rem] border-[2px] border-black rotate-45 mr-3 transition-colors relative group-[.text-white]:border-white"
                            aria-hidden="true"
                          >
                            <span className="absolute size-[4px] bg-transparent bottom-[50%] right-[50%] translate-x-[40%] translate-y-[40%] group-[.text-white]:bg-white"></span>
                          </span>
                          <span>{key.toUpperCase()}</span>
                        </div>
                        <span className="font-roobert text-[14px]">{val.toFixed(2)}</span>
                      </button>
                    ))
                  ) : (
                    <p className="p-3 text-center text-sm">No data available</p>
                  )}
                </div>
              </div>
            </div>
          </main>
          <footer className="relative py-6 flex items-center justify-between">
            <NavBtn direction="left" routerLink="/testing" />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  // Reset each demo's selected category to its initial first (highest value) item.
                  setSelectedCategories({
                    race:
                      sortedData.race.length > 0
                        ? { key: sortedData.race[0][0], value: sortedData.race[0][1] }
                        : null,
                    gender:
                      sortedData.gender.length > 0
                        ? { key: sortedData.gender[0][0], value: sortedData.gender[0][1] }
                        : null,
                    age:
                      sortedData.age.length > 0
                        ? { key: sortedData.age[0][0], value: sortedData.age[0][1] }
                        : null,
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
