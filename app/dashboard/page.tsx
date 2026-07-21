
'use client'
import { div } from "framer-motion/m";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getUserFromToken } from "@/lib/auth";
import { Spinner } from "@/lib/spinner";




export default function DashboardPage() {
    const [appoint, setAppoint] = useState([])
    const [loading, setLoading] = useState(true)
    const [statusFilter, setStatusFilter] = useState("");
    const [orderFilter, setOrderFilter] = useState("desc");



    function formatDate(dateOri: string) {
        const dataFormatted = new Date(dateOri).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return dataFormatted
    }


    useEffect(() =>{
    async function getAppoint() {
        try {
            setLoading(true)
            const res = await fetch('/api/admin/appointments');
            const data = await res.json();
            setAppoint(data);
        } catch(err) {
            console.error("Erro ao buscar agendamentos:", err)
        } finally{
            setLoading(false)
        }
    }
    getAppoint();
    },[])


    if (loading) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
            <Spinner />
        </div>
    )
    }


    if (!Array.isArray(appoint)) {
    return (
        <div className="flex h-screen flex-col items-center justify-center text-slate-800 gap-4 bg-[#181818]">
            <h1 className="text-2xl font-bold text-red-600">Acesso Negado</h1>
            <p className="text-white">Você não tem permissão para acessar o painel administrativo.</p>
            <Link href="/" className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Voltar para o início</Link>
        </div>
    );
    }

    return (
        <div className="flex h-screen bg-slate-50 text-slate-800">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white p-8 flex flex-col">
                <h1 className=" font-bold mb-8">Painel Administrativo</h1>
                <nav className="flex flex-col gap-2">
                    <h1  className="px-4 py-3 rounded-lg bg-slate-800 text-white font-medium cursor-pointer">
                        Agendamentos
                    </h1>
                    <h1 className="px-4 py-3 rounded-lg bg-slate-800 text-white font-medium cursor-pointer">
                        Barbeiros
                    </h1>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {/* Topbar */}
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Meus Agendamentos</h1>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg transition">
                        Novo Agendamento
                    </button>
                </header>

                {/* Cards Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Total</h3>
                        <p id="total-count" className="text-3xl font-bold text-slate-900">0</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Ativos</h3>
                        <p id="active-count" className="text-3xl font-bold text-slate-900">0</p>
                    </div>
                </section>

                {/* Table Section */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Lista de agendamentos</h2>

                    <div className="flex gap-4">
                        <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="">Todos os status</option>
                            <option value="ativo">Ativo</option>
                            <option value="concluido">Concluído</option>
                            <option value="cancelado">Cancelado</option>
                        </select>

                        <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600"
                        value={orderFilter}
                        onChange={(e) => setOrderFilter(e.target.value)}>
                            <option value="desc">Mais recentes</option>
                            <option value="asc">Mais antigos</option>
                        </select>
                    </div>
                
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-500 text-sm">
                                    <th className="py-3 px-4 font-semibold">ID do agendamento</th>
                                    <th className="py-3 px-4 font-semibold">Responsável pelo agendamento</th>
                                    <th className="py-3 px-4 font-semibold">Data de Criação</th>
                                    <th className="py-3 px-4 font-semibold">Data do Agendamento</th>
                                    <th className="py-3 px-4 font-semibold">Status do agendamento</th>
                                </tr>
                            </thead>
                            <tbody id="appointments-table-body" className="divide-y divide-slate-100">
                                {appoint.map((appo: any) => (
                                <tr key={appo.id_appointments}>
                                    <td className="py-3 px-4">{appo.id_appointments}</td>
                                    <td className="py-3 px-4">{appo.email}</td>
                                    <td className="py-3 px-4">{formatDate(appo.created_at)}</td>
                                    <td className="py-3 px-4">{formatDate(appo.date_time)}</td>
                                    <td className="py-3 px-4">{appo.status_appoint}</td>

                                </tr>
                                
                                ))}
                            </tbody>
                        </table>
                    </div>
                
                </section>
            </main>
        </div>
    )
}