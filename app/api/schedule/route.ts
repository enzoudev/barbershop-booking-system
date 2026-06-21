import { NextResponse } from "next/server";
import { pool } from '@/lib/database'


export async function POST(req: Request) {
    
    try {
        const body = await req.json();
        const {id_user, id_service, date_time} = body;

        if(!id_service || !date_time) {
            return NextResponse.json( {error: "Algum campo obrigatório não está preenchido"}, {status:400});
        }
    } catch(err) {

    }
}