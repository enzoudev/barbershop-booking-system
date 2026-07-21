'use client'
import { div } from "framer-motion/client";
import { ChecksIcon, CheckFatIcon, CheckIcon, XIcon} from "@phosphor-icons/react";
import { useState } from 'react'

export function Plans() {
    const [hoverCard, setHoverCard] = useState<string | null>("plan-gold");
    return (
        <div className="h-250 flex flex-col bg-[#181818] w-full items-center ">
            <h1 className="text-[50px] font-black text-white mb-8 tracking-tight mt-20 text-center">Planos</h1>

            <p className="text-gray-400 text-lg max-w-lg">
            Escolha a experiência que melhor combina com o seu estilo. 
            Do cuidado essencial ao atendimento completo, temos o serviço ideal para você.
            </p>


            <div className="card-conteiner flex mt-10 gap-20">
                <div className={`border-2 border-white w-75 h-120 flex flex-col text-center gap-10 rounded-md items-center transition-transform duration-300 ${hoverCard === "plan-essential" ? "scale-110" : "scale-100"  }`} onMouseEnter={() => setHoverCard("plan-essential")}
                    onMouseLeave={() => setHoverCard(null)}>

                <div className="title-container flex flex-col ">
                    <h1 className="Essential text-[20px] font-black text-[#22c55e] tracking-tight mt-5">Essencial</h1>
                    <h1 className="text-[25px] font-black text-white tracking-tight" >100R$</h1>
                    <h1 className="text-[#94a3b8] text-[13px]">Por mês</h1>
                </div>

                <div className="advantages flex flex-col">
                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className="text-white flex-shrink-0" />
                            <span className="text-white font-bold w-8">2x</span> 
                            <span>Cortes de cabelo</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className="text-white flex-shrink-0" />
                            <span className="text-white font-bold w-8">2x</span> 
                            <span>Barba com navalha</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className="text-white flex-shrink-0" />
                            <span className="text-white font-bold w-8">2x</span> 
                            <span>Design com Sobrancelha</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className="text-white flex-shrink-0" />
                            <span className="text-white font-bold w-8">2x</span> 
                            <span>Design com Sobrancelha</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <XIcon size={20} className="text-[#94a3b8] flex-shrink-0" />
                            <span className="text-[#94a3b8]"> Bebidas cortesia</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <XIcon size={20} className="text-[#94a3b8] flex-shrink-0" />
                            <span className="text-[#94a3b8]"> Massagem relaxante</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <XIcon size={20} className="text-[#94a3b8] flex-shrink-0" />
                            <span className="text-[#94a3b8]"> Higienização facial</span>
                        </div>
                </div>
                        <button className="bg-[#03D678] h-10 w-50 text-[#181818] rounded-full cursor-pointer">Assinar plano</button>
                </div>

            

            {/* Segundo plano */}

                <div className={`border-2 border-white w-75 h-120 flex flex-col text-center gap-10 rounded-md items-center transition-transform duration-300 ${hoverCard === "plan-gold" ? "scale-115" : "scale-100"  }`} onMouseEnter={() => setHoverCard("plan-gold")}
                    onMouseLeave={() => setHoverCard(null)}>

                <div className="title-container flex flex-col ">
                    <h1 className="Essential text-[20px] font-black text-[#f5c04b] tracking-tight mt-5">Gold</h1>
                    <h1 className="text-[25px] font-black text-white tracking-tight" >250R$</h1>
                    <h1 className="text-[#94a3b8] text-[13px]">Por mês</h1>
                </div>

                <div className="advantages flex flex-col">
                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className="text-white flex-shrink-0" />
                            <span className="text-white font-bold w-8">∞</span> 
                            <span>Cortes de cabelo</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className="text-white flex-shrink-0" />
                            <span className="text-white font-bold w-8">∞</span> 
                            <span>Barba com navalha</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className="text-white flex-shrink-0" />
                            <span className="text-white font-bold w-8">∞</span> 
                            <span>Design com Sobrancelha</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className="text-white flex-shrink-0" />
                            <span className="text-white font-bold w-8">∞</span> 
                            <span>Design com Sobrancelha</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className=" flex-shrink-0" />
                            <span className="text-white font-bold w-8">∞</span> 
                            <span> Bebidas cortesia</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className=" flex-shrink-0" />
                            <span className="text-white font-bold w-8">∞</span> 
                            <span> Massagem relaxante</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className=" flex-shrink-0" />
                            <span className="text-white font-bold w-8">∞</span> 
                            <span> Higienização facial</span>
                        </div>
                </div>
                        <button className="bg-[#03D678] h-10 w-50 text-[#181818] rounded-full cursor-pointer">Assinar plano</button>
                </div>











                {/* Terceiro plano */}

            <div className={`border-2 border-white w-75 h-120 flex flex-col text-center gap-10 rounded-md items-center transition-transform duration-300 ${hoverCard === "plan-vip" ? "scale-110" : "scale-100"  }`} onMouseEnter={() => setHoverCard("plan-vip")}
            onMouseLeave={() => setHoverCard(null)} >

                <div className="title-container flex flex-col ">
                    <h1 className="Essential text-[20px] font-black text-[#00A6F4] tracking-tight mt-5 ">VIP</h1>
                    <h1 className="text-[25px] font-black text-white tracking-tight" >150R$</h1>
                    <h1 className="text-[#94a3b8] text-[13px]">Por mês</h1>
                </div>

                <div className="advantages flex flex-col">
                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className="text-white flex-shrink-0" />
                            <span className="text-white font-bold w-8">3x</span> 
                            <span>Cortes de cabelo</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className="text-white flex-shrink-0" />
                            <span className="text-white font-bold w-8">3x</span> 
                            <span>Barba com navalha</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className="text-white flex-shrink-0" />
                            <span className="text-white font-bold w-8">3x</span> 
                            <span>Design com Sobrancelha</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className="text-white flex-shrink-0" />
                            <span className="text-white font-bold w-8">3x</span> 
                            <span>Design com Sobrancelha</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className="text-[#94a3b8] flex-shrink-0" />
                            <span className="text-white font-bold w-8">3x</span> 
                            <span> Bebidas cortesia</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className="text-[#94a3b8] flex-shrink-0" />
                            <span className="text-white font-bold w-8">3x</span> 
                            <span> Massagem relaxante</span>
                        </div>

                        <div className="flex items-center  text-gray-300">
                            <CheckIcon size={20} className="text-[#94a3b8] flex-shrink-0" />
                            <span className="text-white font-bold w-8">3x</span> 
                            <span> Higienização facial</span>
                        </div>
                </div>
                        <button className="bg-[#03D678] h-10 w-50 text-[#181818] rounded-full cursor-pointer">Assinar plano</button>
                </div>
            </div>
        </div>
    )
}