'use client'
import { useState, useEffect } from "react"
import generateDays from "@/lib/dayWeek";

import { useSearchParams } from 'next/navigation';
import { div, h1 } from "framer-motion/client";
import { NavBar } from "@/components/common/NavBar";
import { Spinner } from "@/lib/spinner";



export default function Schedules() {
    
    const searchParams = useSearchParams();
    const barberId = searchParams.get('barber');
    const [selectedDate, setSelectedDate] = useState <string | null >(null)
    const [modal, setIsModalOpen] = useState(false)
    const [days] = useState(generateDays());
    const [loading, setLoading] = useState(false);
    const [busy, setBusy] = useState<string[]>([]);
    const [sucess, setSucess] = useState(false)
    const [hour, setHours] = useState([])
    const timeJob = ["08:00","09:00", "10:00", "11:00", "12:00", "14:00","15:00","16:00","17:00","18:00","19:00","20:00"];

    useEffect(() => {
        async function fetchHours() {
            if(!selectedDate || !barberId) return;

            setLoading(true);
            
            try {
                const res = await fetch(`/api/appointments?date=${selectedDate}&id_barber=${barberId}`);
                const data = await res.json();

                setBusy(data)
                setSucess(true)
            } catch(err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
     fetchHours()
        }, [selectedDate, barberId]);
    
    if(loading) return <Spinner/>

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

            {sucess && (
                <div className="flex justify-center p-6">
                    <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-center font-semibold mb-4 text-gray-700">Escolha o horário</h2>
                    <div className="grid grid-cols-3 gap-3">
                    {timeJob.map((time) => {
                        const isOcupado = Array.isArray(busy) && busy.includes(time)
                        
                        return (
                            <button 
                                key={time} 
                                disabled={isOcupado}
                                className={`p-4 border rounded ${isOcupado ? 'bg-red-500' : 'bg-white'} text-[#0C0C09] ${isOcupado ? 'cursor-none' : 'cursor-pointer'}`}
                            >
                                {time}
                            </button>
                        );
                    })}
                    </div>
                    </div>
                </div>
            )}
        </div>
    )
}