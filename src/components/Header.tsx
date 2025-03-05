import rightBracket from '../assets/rightBracket.svg';
import leftBracket from '../assets/leftBracket.svg';
import Image from "next/image";
import Link from 'next/link';

type NavProps = {
  onClick?: () => void;
  logo?: "primaryStyle";
  intro?: "visible" | 'hidden';
  parent?: "primaryStyle";
  logoText?: React.ReactNode;
  introText?: React.ReactNode;
  blackBtn?: string;
};

export const 
Header = ({  
  logo = "primaryStyle", 
  intro = "hidden", 
  parent = "primaryStyle",
  logoText = 'SKINSTRIC',
  introText = 'INTRO',
  blackBtn = '',
}: NavProps) => {
  
  const parentClasses = {
    primaryStyle: "w-full h-16 flex justify-between items-center bg-transparent",
  };
  const logoClasses = {
    primaryStyle: "tracking-tighter text-black font-roobert font-semibold text-[clamp(.65rem,1vw,0.75rem)] textMount",
  };
  const introClasses = {
    visible: "ml-7 flex justify-center items-center text-gray-900 opacity-60",
    hidden: 'hidden'
  };

  return (
  <div className={`${parentClasses[parent]}`}>
    <div className="flex items-center justify-center">

      <Link href='/' className={`
        ${logoClasses[logo]}`} >
        {logoText}
      </Link>
      
      <button className={`${introClasses[intro]}`} >
        <Image src={leftBracket} alt="leftBracket" />
        <span className="mx-2 text-sm">
        {introText}
        </span>
        <Image src={rightBracket} alt="rightBracket" />
      </button>
    </div>
      {blackBtn.length > 0 &&
      <button className="w-[140px] h-8 bg-black text-white flex items-center justify-center hover:bg-slate-900">
            <span className="text-[10px] font-roobert font-semibold ">{blackBtn}</span>
      </button>
      }
  </div>
  );
};
