

import { NextResponse, NextRequest } from "next/server";
import { pool } from '@/lib/database'
import { getUserFromToken } from "@/lib/auth";


export default async function GET(req: NextRequest){
    try {
        const token = req.cookies.get('token')?.value
        const user = await getUserFromToken(String(token));

        if(!user) {
            return NextResponse.json( {error: 'Usuário não logado'}, {status: 401});
        }

        const { rows } = await pool.query('SELECT status_appoint, id_appointments, created_at, date_time FROM APPOINTMENTS WHERE id_user = $1', [user.id]);

        if(rows.length === 0) {
            return NextResponse.json( {message: 'Nenhum agendamento feito!'}, {status: 400});
        }


        return NextResponse.json(rows, {status: 200})
    } catch (err) {
        console.error('Erro na API: ', err);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}