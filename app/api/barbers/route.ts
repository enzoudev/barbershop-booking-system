
import { NextResponse } from 'next/server';
import { pool } from '@/lib/database';


export async function GET() {
    try {
        const result = await pool.query('SELECT id_barber, name, photo_url FROM barbers');
        return NextResponse.json(result.rows)
    } catch(error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}