import { Hero } from './hero'
import { Plans } from './plans'


export function HomePage() {

    return (
        <main className='w-full'>
            <Hero className={"w-full bg-[#0A0A0A] py-32 flex justify-center items-center border-b-1"}/>
            <Plans/>
        </main>
    )
}