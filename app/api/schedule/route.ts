import { NextRequest, NextResponse } from "next/server";
import { pool } from '@/lib/database'


export async function POST(req: NextRequest) {
    
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
        const userId = await getUserIdFromToken(token);


        const body = await req.json();
        const {id_service, date_time} = body;

        if(!id_service || !date_time) {
            return NextResponse.json( {error: "Algum campo obrigatório não está preenchido"}, {status:400});
        }

        await pool.query("INSERT INTO appointments (id_user, id_service, date_time) VALUES  ($1, $2, $3)",[userId, id_service, date_time])

        return NextResponse.json( {message: "Agendamento criado com sucesso!"}, {status:201})
    } catch(err) {
        console.error("Erro na API:", err)
        return NextResponse.json( {error: "Erro na API"}, {status: 500})
    }
}