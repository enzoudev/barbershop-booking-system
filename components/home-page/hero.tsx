'use client'
import Image from "next/image";
import { motion } from "framer-motion";


export function Hero( {className }: {className?: string}) {
    return (
        <section className={className}>
            <div className="max-w-4xl text-center px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight">
                        ESTILO E<br />
                        PRECISÃO.
                    </h1>
                    <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                        O corte que define o seu visual. Agende seu horário e sinta a experiência de uma barbearia clássica, 
                        onde a tradição encontra o estilo moderno. 
                        <br /><br />
                        Oferecemos desde o acabamento mais preciso na navalha até tratamentos de barba com toalha quente, 
                        tudo pensado para garantir o seu bem-estar. Venha relaxar, tomar um café e sair pronto para 
                        qualquer desafio.
                    </p>
                    <button className="bg-white text-black px-10 py-4 font-bold text-lg hover:bg-gray-200 transition-colors cursor-pointer">
                        AGENDAR HORÁRIO
                    </button>
                </motion.div>
            </div>
        </section>
    )
}