import { NextResponse } from "next/server";
import { pool } from '@/lib/database'
import  bcrypt from 'bcryptjs'


export async function POST(req: Request) {

    try {
        const body = await req.json();
        const {name, email, password} = body;

        if(!name || !email || !password) {
            return NextResponse.json( {error: 'Algum campo obrigatório está em branco'}, {status:400});
        }  

        const client = await pool.connect();

        try {
        const result = await client.query('SELECT id FROM users WHERE email = $1', [email]);
        const user = result.rows;

        if(user.length > 0) {
            return NextResponse.json( {error: "Já existe uma conta com esse email"}, {status:400})
        }


        
        const salt = await bcrypt.genSalt(10);
        const passwordCripto = await bcrypt.hash(password, salt)

        await client.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, passwordCripto]);

        return NextResponse.json( {message: "Conta criada com sucesso!"}, {status:201})
        } finally {
            client.release();
        }


        
    } catch(error) {
        console.error('Erro na API:', error)
        return NextResponse.json({ error: 'Erro interno no servidor ao criar conta.' }, { status: 500 });
    } 
}