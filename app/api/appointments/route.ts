import { NextRequest, NextResponse } from "next/server";
import { pool } from '@/lib/database'
import { getUserFromToken } from '@/lib/auth'
import { formatTime } from '@/lib/formatTime'



export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);


        const date = searchParams.get('date'); 
        const id_barber = searchParams.get('id_barber');

    if (!date || !id_barber) {
    return NextResponse.json({ error: "Data ou barbeiro não informado" }, { status: 400 });
    }

        const { rows } = await pool.query(
        "SELECT date_time FROM appointments WHERE date_time::date = $1 AND id_barber = $2",
        [date, id_barber]
        );
    
    const timeJob = ["08:00","09:00", "10:00", "11:00", "12:00", "14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
    const ocupados = rows.map(row => formatTime(row.date_time));




    return NextResponse.json(ocupados)
    } catch(err) {
        console.error("Erro na API: ", err)
        return NextResponse.json( {error: "Erro na API"}, {status:500})
    }
}






export async function POST(req: NextRequest) {
    
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
        const user = await getUserFromToken(token);
        console.log("O que o getUserFromToken retornou:", user);
        const body = await req.json();
        const {date_time, id_barber} = body;

        if (!user) {
        return NextResponse.json({ message: "Usuário inválido ou não encontrado" }, { status: 400 });
        }
        
        if(!id_barber|| !date_time) {
            return NextResponse.json( {error: "Algum campo obrigatório não está preenchido"}, {status:401});
        }

        const checkExist = await pool.query(
        "SELECT * FROM appointments WHERE date_time = $1 AND id_barber = $2",
        [date_time, id_barber]
        );

        if (checkExist.rows.length > 0) {
        return NextResponse.json({ error: "Este horário já foi reservado!" }, { status: 409 });
        }

        await pool.query("INSERT INTO appointments (id_user, date_time, id_barber) VALUES  ($1, $2, $3)",[user.id, date_time, id_barber])

        return NextResponse.json( {message: "Agendamento criado com sucesso!"}, {status:201})
    } catch(err: any) {
        console.error("Erro na API:", err)
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}


