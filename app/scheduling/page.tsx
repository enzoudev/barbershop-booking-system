'use client'
import { NavBar } from "@/components/common/NavBar";
import { div } from "framer-motion/client";

import { useState, useEffect } from 'react'



export default function Scheduling() {
    const [barbeiros, setBarbeiros] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchBarbeiros() {
            try {
                const res = await fetch('/api/barbers')
                const data = await res.json()
                setBarbeiros(data)
            } catch (error) {
                console.error("Erro ao buscar barbeiros:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchBarbeiros()
    }, [])

    if (loading) return <p>Carregando barbeiros...</p>


    return (
        
    <div>
        <NavBar/>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
            {barbeiros.map((barbeiro: any) => (
                <div key={barbeiro.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center">
                    <img 
                        src={barbeiro.photo_url} 
                        alt={barbeiro.name} 
                        className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-100"
                    />
                    <h3 className="text-xl font-bold text-gray-800">{barbeiro.name}</h3>
                    <button className="mt-4 bg-[#181818] text-white py-2 px-6 rounded-lg hover:bg-black transition">
                        Agendar
                    </button>
                </div>
            ))}
        </div>  
    </div>
    )
}