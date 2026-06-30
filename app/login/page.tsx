'use client'
import Image from "next/image"
import { EnvelopeSimpleIcon, EyeIcon } from "@phosphor-icons/react"
import { useState, useEffect } from "react"
import {Spinner} from '@/lib/spinner'
import { authenticateUser } from "@/services/authService"


export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [warn, setWarn] = useState("")
    const [validation, setVal] = useState(false)

    const handleLogin = async () => {

        console.log("Entrou na função handleLogin!");
        if(!email || !password) {
            setWarn("Algum campo não está preenchido corretamente")
            setVal(true)
            return
        }
        setVal(false);
        setLoading(true);
        try {
            const data = await authenticateUser(email, password)
            console.log("Sucesso", data)
        } catch(err) {
          setWarn("Erro ao autenticar. Verifique suas credenciais.");
          setVal(true)  
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="bg-[#181818] min-h-screen flex items-center justify-center">
            <section className="flex bg-white w-[1000px] h-[700px] m-auto shadow-2xl overflow-hidden rounded-xs" >

            <div className="form-login flex flex-col items-center w-1/2 mt-50 gap-10 h-full">
                <div className="flex items-center flex-col">
                <p className="text-[#475569] text-[15px]">Dê o próximo passo no seu estilo</p>
                <h2 className=" text-[20px] text-black font-black tracking-tight border-[#020618]">Acesse sua conta para continuar.</h2>
                <div className={`${!validation ? "hidden" : "text-[13px] text-red-500"}`} >{warn}</div>
            </div>   

                <div className="input-conteiner flex flex-col gap-[15px] w-full px-16">
                    
                    <div className="relative w-full">
                        {/* O label posicionado exatamente no topo da borda */}
                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500">
                            E-mail
                        </label>
                        


                        <button 
                            type="button" // OBRIGATÓRIO: isso evita o refresh
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                            onClick={(e) => e.preventDefault()}
                        >
                            <EnvelopeSimpleIcon size={20} />
                        </button>
                        
                        <input 
                            type="email" 
                            placeholder="example@email.com" 
                            className="w-full h-14 border border-[#cbd5e1] rounded-lg px-4 outline-none focus:border-[#181818] placeholder:text-[#64748b] text-black"
                            onChange={(e) => setEmail(e.target.value)}
                        />


                    </div>

                    <div className="relative w-full">
                        {/* O label posicionado exatamente no topo da borda */}
                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500">
                            Senha
                        </label>
                        
                        <input 
                            type="password" 
                            placeholder="********" 
                            className="w-full h-14 border border-[#cbd5e1] rounded-lg px-4 outline-none focus:border-[#181818] placeholder:text-[#64748b] text-black"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <EyeIcon size={20} />
                        </div> */}
                    </div>


                    <button className="border border-[#cbd5e1] rounded-md h-[45px] w-full h-12 px-4 text-white bg-[#181818] cursor-pointer flex justify-center items-center" onClick={()=>  handleLogin()}>{loading ? <Spinner/> : "Entrar"}</button>
                </div>

                <div className="flex self-start mt-[150px] ml-[15px]">
                    <h1 className=" text-[#334155] text-[13px] t">Não tem uma conta? </h1>
                    <p className="ml-[4px] text-[#3A7FF9] text-[13px] cursor-pointer"> Se Registre</p>
                </div>
            </div>
    
            <div className="w-1/2 relative">
                <Image 
                        src="/background-login.jpg" 
                        alt="Background de estilo"
                        fill
                        className="object-cover rounded-l-[100px]"
                />
            </div>

            </section>
        </div>
    )
}