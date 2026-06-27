"use client";

import Image from "next/image";
import { useState } from 'react'
export function NavBar() {

const [bgLogin, setbgLogin] = useState(false);
const [hoverNav, setHoverNav] = useState<string | null>(null);


const customColor = "text-[oklch(70.7%_0.022_261.325)]";
  return (
    <nav className="w-full p-6 bg-[#EFEFE9] text-black flex justify-center items-center shadow-md gap-50">
      {/* Grupo da Esquerda (Logo + Links) */} 
      <div className="flex items-center gap-6">
        <Image 
          src="/hairstyle (1).png" 
          alt="Logo da Barbearia" 
          width={100}  // Aumentado para garantir resolução
          height={100} // Aumentado para garantir resolução
          className="h-12 w-auto" // A imagem manterá a altura de 12 (48px)
        />

        <div className="flex gap-6">
          <h1 className={`cursor-pointer text-sm ${hoverNav === "quem" ? "text-black" : customColor}`} onMouseEnter={() => setHoverNav("quem")} onMouseLeave={() => setHoverNav(null)}>Quem somos nós?</h1>
          <h1 className={`cursor-pointer text-sm ${hoverNav === "barbeiros" ? "text-black" : customColor}`} onMouseEnter={() => setHoverNav("barbeiros")} onMouseLeave={() => setHoverNav(null)}>Barbeiros</h1>
          <h1 className={`cursor-pointer text-sm ${hoverNav === "planos" ? "text-black" : customColor}`} onMouseEnter={() => setHoverNav("planos")} onMouseLeave={() => setHoverNav(null)} >Planos</h1>
        </div>
      </div>

      {/* Grupo da Direita (Login + Contato) */}
      <div className="flex gap-6 items-center">
        <h1 className={`cursor-pointer text-sm ${hoverNav === "contate" ? "text-black" : customColor}`} onMouseEnter={() => setHoverNav("contate")} onMouseLeave={() => setHoverNav(null)}>Contate-nos</h1>

        <h1 className={`text-sm text-[#243741]  flex justify-center items-center w-20 h-10 transition-colors duration-200 rounded-md cursor-pointer border border-gray-300 ${bgLogin ? "bg-[#e5e5d5]" : "bg-white"}`} 
        onMouseEnter={() => setbgLogin(true)}
        onMouseLeave={() => setbgLogin(false)} 
        >Login
        </h1>

      </div>
    </nav>
  )
}