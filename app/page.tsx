import Image from "next/image";
import {Hero} from '@/components/home-page/hero'
import { Plans } from '@/components/home-page/plans'


import { NavBar } from "@/components/common/NavBar"; 
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
  
      
      <NavBar/>
      <Hero className={"w-full bg-[#0A0A0A] py-32 flex justify-center items-center border-b-1"}/>
      <Plans/>
    </div>
  );
}
