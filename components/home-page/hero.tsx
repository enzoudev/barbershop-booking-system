import Image from "next/image";


export function Hero() {
    return (
        <div className="relative w-full  bg-[#0A0A0A] flex justify-center">
            
            <div className="hero-main flex justify-between">
                <img src="foto-equipamentos.jpg" alt="Equipamentos do barbeiro" width={600} height={400} className=" rounded-md [mask-image:radial-gradient(circle_at_center,black_60%,transparent_100%)]"  />
                <h1>Venha agendar seu horário</h1>
                <button>Agende seu horário</button>
            </div>
        </div>
    )
}