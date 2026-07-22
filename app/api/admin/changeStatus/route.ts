import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/database";
import { getUserFromToken } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value;

        const user = await getUserFromToken(String(token));

        if(!user) {
            return NextResponse.json( {message: "Usuário não está logado"}, {status: 400});
        }

        if(user.role != 'admin') {
        return NextResponse.json( {message: "Usuário não é administrador"}, {status: 403});
        }

        const body = await req.json();

        const { id_appoint, status } = body;

        const result = await pool.query('UPDATE APPOINTMENTS SET status_appoint = $1 WHERE id_appointments = $2', [status, id_appoint]);

        if(!result.rowCount || result.rowCount === 0){
            return NextResponse.json( {message: 'Agendamento não encontrado'}, {status: 404});
        }

        return NextResponse.json( {message: "Agendamento alterado com sucesso!"}, {status:200})

    } catch(err) {
        console.error("Erro na API: ", err);
        return NextResponse.json( {error: 'Erro interno no servidor'}, {status:500})
    }
}
