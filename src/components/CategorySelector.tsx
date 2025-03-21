import React from 'react';
import { NavBtn } from './NavBtn';

type categorySelectorProps = {
    sortedData: Record<string, { key: string; value: number }[]>;
    setShowMobileCategories: React.Dispatch<React.SetStateAction<boolean>>;
    showMobileCategories: boolean;
    selectedDemo: string;
    currentSelectedCategory?: { key: string; value: number };
    setSelectedCategories: React.Dispatch<React.SetStateAction<{
    race: { key: string; value: number } | null;
    gender: { key: string; value: number } | null;
    age: { key: string; value: number } | null;
  }>>;
  resetCategories: () => void;
}


export const CategorySelector = ({  sortedData,
    setShowMobileCategories,
    selectedDemo,
    currentSelectedCategory, showMobileCategories, setSelectedCategories, resetCategories}:categorySelectorProps) => {

return (
<div className={`category_container fadeRight w-screen 520Brk:w-[60%] top-0 h-screen 520Brk:h-auto fixed ${showMobileCategories ? 'block' : 'hidden'} 520Brk:static  520Brk:flex 900Brk:w-[55%] 1150Brk:w-[26%] border-[1px] border-t-black bg-[#f3f3f4] flex-col justify-start`}>
                <div className="flex flex-col w-full h-full justify-between">
                  <div className="p-2 520Brk:p-0">
                    <div className=" px-3 py-3 520Brk:hidden">
                      <div className="backBtnContainer pl-2" onClick={() => {
                        if(showMobileCategories) {
                          setShowMobileCategories((bool) => !bool)
                        }
                      }}>
                  <NavBtn direction="left" />
                      </div>
                  
                  <h1 className="pt-4 opacity-[60%]">Select race if correct</h1>
                    </div>
                  <div className="p-3 520Brk:border-transparent border-t-2 border-black w-full h-[46px] flex items-center justify-between font-roobert text-[14.5px]">
                    <span>{selectedDemo.toUpperCase()}</span>
                    <span>A.I. CONFIDENCE</span>
                  </div>

                  {sortedData[selectedDemo].length > 0 ? (
                    sortedData[selectedDemo].map(({key, value}) => (
                      <button
                      key={key}
                      onClick={() =>
                        setSelectedCategories((prev) => ({
                          ...prev,
                          [selectedDemo]: { key: key, value: value },
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
                        <span className="font-roobert text-[14px]">{value.toFixed(2)}</span>
                      </button>
                      
                    ))
                  ) : (
                    <p className="p-3 text-center text-sm">No data available</p>
                  )}
                  </div>
                            <div className=" gap-3 justify-end p-3 bg-black 900Brk:hidden flex">
              <button
                onClick={resetCategories}
                className="w-[70px] h-5 bg-black text-white flex items-center justify-center hover:bg-slate-900"
                >
                <span className="text-[10px] font-roobert font-semibold">RESET</span>
              </button>
              <button className="w-[70px] h-5 bg-black text-white flex items-center justify-center hover:bg-slate-900">
                <span className="text-[10px] font-roobert font-semibold">CONFIRM</span>
              </button>
            </div>
                </div>
                
              </div>
)}

