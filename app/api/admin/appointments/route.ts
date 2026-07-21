

import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/database";
import { getUserFromToken } from "@/lib/auth";


export async function GET(req: NextRequest) {

    try{
        const token = req.cookies.get('token')?.value;
        const user = await getUserFromToken(String(token));

        if(!user) {
            return NextResponse.json( {error: 'Usuário não logado'}, {status:401});
        }


        if(user.role != 'admin') {
            return NextResponse.json( {message: "Usuário não possui cargo de admin"}, {status:403});
        }

        const { rows }  = await pool.query
        ('SELECT u.email, ap.id_appointments, ap.status_appoint, ap.id_appointments, ap.created_at, ap.date_time FROM APPOINTMENTS ap JOIN USERS u ON u.ID_USER = ap.ID_USER ');
        
        if(rows.length === 0) {
            return NextResponse.json( {message: "Nenhum agendamento feito"});
        }

        return NextResponse.json(rows, {status: 200});
    } catch(err) {
        console.error("Erro na API: ", err);
        return NextResponse.json( {error: "Erro interno na API"}, {status: 500})
    }
}