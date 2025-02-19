

import rightBracket from '../assets/rightBracket.svg';
import leftBracket from '../assets/leftBracket.svg';
import Image from "next/image";

type ButtonProps = {
  logo: "primaryStyle";
  intro: "primaryStyle";
  parent: "primaryStyle";
  logoText?: React.ReactNode;
  introText?: React.ReactNode;
};

export const NavBar = ({  
  logo = "primaryStyle", 
  intro = "primaryStyle", 
  parent = "primaryStyle",
  logoText = 'SKINSTRIC',
  introText = 'INTRO'
}: ButtonProps) => {
  const parentClasses = {
    primaryStyle: "w-full h-16 flex justify-start items-center p-4",
  };
  const logoClasses = {
    primaryStyle: "text-black font-roobert font-semibold text-sm",
  };
  const introClasses = {
    primaryStyle: "ml-7 flex justify-center items-center text-gray-900 opacity-60",
  };

  return (
    <nav className={`${parentClasses[parent]}`}>
      <button className={`${logoClasses[logo]}`} >
        {logoText}
      </button>
      
      <button className={`${introClasses[intro]}`} >
        <Image src={leftBracket} alt="leftBracket" />
        <span className="mx-2 text-sm">
        {introText}
        </span>
        <Image src={rightBracket} alt="rightBracket" />
      </button>
    </nav>
  );
};
