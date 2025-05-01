import rightBracket from '../assets/rightBracket.svg';
import leftBracket from '../assets/leftBracket.svg';
import Image from "next/image";
import Link from 'next/link';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

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
    primaryStyle: "w-full h-16 flex justify-between items-center ",
  };
  const logoClasses = {
    primaryStyle: "tracking-tighter text-black font-roobert font-semibold text-[clamp(.65rem,1vw,0.75rem)] textMount",
  };
  const introClasses = {
    visible: "ml-7 flex justify-center items-center text-gray-900 opacity-60",
    hidden: 'hidden'
  };

  return (
  <div className={`${parentClasses[parent]} pl-8 pr-8 z-[100]`}>
    <div className="flex items-center justify-center ">

      <Link href='/' className={`
      dark:text-white
        ${logoClasses[logo]}`} >
        {logoText}
      </Link>
      
      <button className={`${introClasses[intro]} dark:brightness-[5000]`} >
        <Image src={leftBracket} alt="leftBracket" />
        <span className="mx-2 text-sm dark:text-white textMount">
        {introText}
        </span>
        <Image src={rightBracket} alt="rightBracket" />
      </button>
    </div>
    <div className="flex gap-3 items-center content-around">

      <SignedOut>
              <SignInButton >
      <button className="textMount 520Brk:w-[140px] w-[70px] h-8 bg-black text-white flex items-center justify-center hover:bg-slate-900 ">
            <span className="text-[12px] font-roobert font-semibold ">{blackBtn || 'SIGN IN'}</span>
      </button>
              </SignInButton>
              <SignUpButton >
          <button className="textMount 520Brk:w-[140px] w-[70px]  h-8 bg-black text-white flex items-center justify-center hover:bg-slate-900 ">
                <span className="text-[12px] font-roobert font-semibold ">{blackBtn || 'SIGN UP'}</span>
          </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
        </SignedIn>
      </div>
  </div>
  );
};
