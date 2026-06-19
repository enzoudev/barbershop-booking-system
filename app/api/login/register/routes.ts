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

        const [user]: any = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);

        if(user.length > 0) {
            return NextResponse.json( {error: "Já existe uma conta com esse email"}, {status:400})
        }


        
        const salt = await bcrypt.genSalt(10);
        const passwordCripto = await bcrypt.hash(password, salt)

        await pool.query('INSERT INTO usuarios (name, email, password) VALUES (?,?,?)', [name, email, passwordCripto])

        return NextResponse.json( {message: "Conta criada com sucesso!"}, {status:201})
    } catch(error) {
        console.error('Erro na API:', error)
        return NextResponse.json({ error: 'Erro interno no servidor ao criar conta.' }, { status: 500 });
    }
}