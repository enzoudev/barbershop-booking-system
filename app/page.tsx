import Image from "next/image";
import {Hero} from '@/components/home-page/hero'
import { Plans } from '@/components/home-page/plans'
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero/>
      <Plans/>
    </div>
  );
}
