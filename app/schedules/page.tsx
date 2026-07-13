'use client'
import { useState, useEffect } from "react"
import generateDays from "@/lib/dayWeek";

import { useSearchParams } from 'next/navigation';
import { div, h1 } from "framer-motion/client";
import { NavBar } from "@/components/common/NavBar";



export default function Schedules() {
    
    const searchParams = useSearchParams();
    const barberId = searchParams.get('barber');
    const [selectedDate, setSelectedDate] = useState <string | null >(null)
    const [modal, setIsModalOpen] = useState(false)
    const [days] = useState(generateDays());
    const [loading, setLoading] = useState(true);
    const [horarios, setHorarios] = useState<string[]>([]);

    useEffect(()=> {
        async function fetchTime() {
            try {
                const res = await fetch('/api/appointments');
                const data = await res.json()
            } catch(err) {
               console.error('Erro ao acessar API: ', err) 
            } finally {
                setLoading(false)
            }
        }

        fetchTime()
    }, [])

    return (
        
        <div  className="min-h-screen flex flex-col items-center">
            <NavBar/>
            <div className="w-full flex justify-center p-10 gap-[20px] bg-[#3b82f6]">
            {days.map((day) => {
                const isSelected = selectedDate === day.dataISO;
                
                return (
                
                    <div 
                        key={day.dataISO} 
                        onClick={() => {
                            setSelectedDate(day.dataISO);
                            setIsModalOpen(true);
                        }}
                        className={`
                            cursor-pointer p-4 rounded-xl border transition-all duration-200 w-20 flex flex-col items-center justify-center
                            ${isSelected 
                                ? "bg-[#181818] text-white border-[#181818]" 
                                : "bg-white text-gray-800 border-gray-200 hover:border-gray-400"
                            }
                        `}
                    >
                        <span className={`text-xs uppercase ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
                            {day.diaSemana}
                        </span>
                        <span className="text-2xl font-bold">
                            {day.diaMes}
                        </span>
                    </div>
                );
            })}
            </div>
        </div>
    )
}