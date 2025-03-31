'use client';

import { Header } from "@/components/Header";
import { IntroSquare } from "@/components/IntroSquare";
import { NavBtn } from "@/components/NavBtn";
import Link from "next/link";
export default function Home() {

return (
  <>
  <Header blackBtn="ENTER CODE"
  intro="visible"/>
    <main>
      <div className="homeDirectory relative flex justify-center pt-[150px]">
          <IntroSquare startVisible={true}>
          <NavBtn containerClasses="absolute rotate-45 " direction="left"></NavBtn>
          </IntroSquare>
      </div>
    </main>
    <footer>
    <h1 className="max-w-[316px] pb-4">
      Skinstric developed an A.I. that creates a highly-personalised routine tailored to what your skin needs.</h1>
    </footer>
  </>
  );
}
