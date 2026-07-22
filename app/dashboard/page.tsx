
'use client'
import { div } from "framer-motion/m";
import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircleIcon, ProhibitInsetIcon } from "@phosphor-icons/react"
import { getUserFromToken } from "@/lib/auth";
import { Spinner } from "@/lib/spinner";
import {changeStatusService} from '@/services-admin/changeStatus'




export default function DashboardPage() {
    const [appoint, setAppoint] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingFilter, setLoadingFilter] = useState(false);
    const [statusFilter, setStatusFilter] = useState("");
    const [orderFilter, setOrderFilter] = useState("desc");
    const [loadingStatus ,setLoadingStatus] = useState(false)
    const [updatingId, setUpdatingId] = useState<number | null>(null);

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

    function capitalize(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    async function handleChangeStatus(id_appoint: number, status: string) {
        try {
            setLoadingStatus(true)
            setUpdatingId(id_appoint)
            const data = await changeStatusService(id_appoint, status);
            console.log("Status mudado com sucesso!");
            
        } catch(err) {
            console.error("Erro ao mudar status: ", err);
        } finally {
            setLoadingStatus(false);
            setUpdatingId(null)
        }
    }

    useEffect(() => {
    async function fetchAppointments() {
            try {
                
                if (appoint.length === 0) {
                    setLoading(true);
                } else {
                    setLoadingFilter(true);
                }

                const url = statusFilter 
                    ? `/api/admin/appointments?status=${statusFilter}&order=${orderFilter}`
                    : `/api/admin/appointments?order=${orderFilter}`;

                const res = await fetch(url);
                const data = await res.json();
                
                
                if (Array.isArray(data)) {
                    setAppoint(data);
                } else {
                    setAppoint([]);
                }
            } catch (err) {
                console.error("Erro ao buscar agendamentos:", err);
                setAppoint([]);
            } finally {
                setLoading(false);
                setLoadingFilter(false);
            }
        }

        fetchAppointments();
    }, [statusFilter, orderFilter, updatingId]);


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
                </header>

                {/* Cards Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Total</h3>
                        <p id="total-count" className="text-3xl font-bold text-slate-900">{appoint.length}</p>
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
                                    <th className="py-3 px-4 font-semibold">Alterar Status</th>
                                </tr>
                            </thead>
                            
                            <tbody id="appointments-table-body" className="divide-y divide-slate-100">
                                {loadingFilter ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center">
                                            <Spinner />
                                        </td>
                                    </tr>
                                ) : appoint.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-slate-500">
                                            Nenhum agendamento encontrado.
                                        </td>
                                    </tr>
                                ) : (
                                    appoint.map((appo: any) => (
                                        <tr key={appo.id_appointments}>
                                            <td className="py-3 px-4">{appo.id_appointments}</td>
                                            <td className="py-3 px-4">{appo.email}</td>
                                            <td className="py-3 px-4">{formatDate(appo.created_at)}</td>
                                            <td className="py-3 px-4">{formatDate(appo.date_time)}</td>
                                            <td className="py-3 px-4">{capitalize(appo.status_appoint)}</td>
                                            {loadingStatus ?
                                            (<td className="py-3 px-4"><Spinner/></td>) :
                                            (<td className="py-3 px-4 flex gap-[4px]">
                                                <button disabled={appo.status_appoint === 'concluido'} className="text-green-600 hover:text-green-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed" onClick={() => handleChangeStatus(appo.id_appointments, 'concluido')}> 
                                                    <CheckCircleIcon size={25} color="green" /> 
                                                </button>
                                                <button disabled={appo.status_appoint === 'cancelado'} className="text-red-600 hover:text-red-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed" onClick={() => handleChangeStatus(appo.id_appointments, 'cancelado')}> 
                                                    <ProhibitInsetIcon size={25} color="red" /> 
                                                </button>
                                            </td>)}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                
                </section>
            </main>
        </div>
    )
}