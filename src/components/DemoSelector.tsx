import React from "react";
import { PercentageCircle } from "./PercentageCircle";

type demoSelectorProps = {
  sortedData: Record<string, { key: string; value: number }[]>;
  setSelectedDemo: (value: 'race' | 'gender' | 'age') => void;
  setShowMobileCategories: (value: boolean) => void;
  selectedDemo: string;
  currentSelectedCategory?: { key: string; value: number };
  selectedCategories: {
    race: {
        key: string;
        value: number;
    } | null;
    gender: {
        key: string;
        value: number;
    } | null;
    age: {
        key: string;
        value: number;
    } | null;
}

};

export const DemoSelector: React.FC<demoSelectorProps> = ({
  sortedData,
  setSelectedDemo,
  setShowMobileCategories,
  selectedDemo,
  selectedCategories
}) => {
    
  
  return (
    <div className="fadeRight 900Brk:w-[13%] w-full smallest:w-full 520Brk:w-[40%] 900Brk:h-auto gap-2 flex flex-col justify-start items-center">
      {Object.keys(sortedData).map((key) => {
        const typedKey = key as keyof typeof selectedCategories;
        return (
          <button
            key={key}
            id={`${key}Box`}
            onClick={() => {
              console.log(selectedCategories[typedKey])
              setSelectedDemo(typedKey as keyof typeof setSelectedDemo);
              if (window.innerWidth < 520) {
                setShowMobileCategories(true);
                console.log("MobileCAts");
              }
            }}
            className={`w-full 900Brk:h-[20%] h-[33%] text-black font-roobert font-semibold border-[1px] border-t-black ${
              selectedDemo === key
                ? "bg-black text-white hover:bg-[#1e1e1e]"
                : "bg-[#f3f3f4] hover:bg-[#d1d1d3]"
            } flex flex-col justify-between items-center p-2`}
          >
            {sortedData[typedKey].length > 0 && (
              <>
                <span className="text-start w-full text-xs 1150Brk:text-base flex justify-between">
                  {selectedCategories[typedKey]?.key.toUpperCase()}
                  <span className="520Brk:hidden">{selectedCategories[typedKey]?.key.toUpperCase()}</span>
                </span>
                <div className="900Brk:hidden visible p-4">
                  <PercentageCircle
                    size={"150px"}
                    textColor="black"
                    borderCol="grey"
                    bgBorderCol="white"
                    selectedCategories={selectedCategories[typedKey]}
                  />
                </div>
                <span className="font-roobert 520Brk:hidden">EDIT</span>
                <span className="hidden 520Brk:inline text-start w-full text-xs 1150Brk:text-base">
                  {key.toUpperCase()}
                </span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
};
