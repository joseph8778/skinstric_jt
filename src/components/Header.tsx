import rightBracket from '../assets/rightBracket.svg';
import leftBracket from '../assets/leftBracket.svg';
import Image from "next/image";

type NavProps = {
  onClick?: () => void;
  logo: "primaryStyle";
  intro: "visible" | 'hidden';
  parent: "primaryStyle";
  logoText?: React.ReactNode;
  introText?: React.ReactNode;
};

export const 
Header = ({  
  logo = "primaryStyle", 
  intro = "hidden", 
  parent = "primaryStyle",
  logoText = 'SKINSTRIC',
  introText = 'INTRO',
}: NavProps) => {
  const parentClasses = {
    primaryStyle: "w-full h-16 flex justify-start items-center",
  };
  const logoClasses = {
    primaryStyle: "tracking-tighter text-black font-roobert font-semibold text-[clamp(.65rem,1vw,0.75rem)] textMount",
  };
  const introClasses = {
    visible: "ml-7 flex justify-center items-center text-gray-900 opacity-60",
    hidden: 'hidden'
  };

  return (
    <nav className={`${parentClasses[parent]}`}>
      <button className={`
        ${logoClasses[logo]}`} >
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
