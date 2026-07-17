import { NextResponse } from 'next/server'
import { pool } from '@/lib/database'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

export async function POST( req: Request) {
    try {
        const body = await req.json();
        console.log("O que chegou no servidor:", body);
        const {email, password} = body
        if(!email || !password) {
            return NextResponse.json( {error: 'Algum campo obrigatório está em branco!'}, {status: 400})
        }

    const results = await pool.query( 'SELECT * FROM users WHERE email = $1', [email])
    
    const resultUser = results.rows

    if(resultUser.length == 0) {
        return NextResponse.json( {error: 'Email/usuário ou senha incorretos'}, {status: 400})
    }
    
    const usuario = resultUser[0]

    const passwordMatch = await bcrypt.compare(password, usuario.password);
    if(!passwordMatch) {
        return NextResponse.json( {error: 'Senha incorreta.'}, {status: 401})
    }
    console.log("Gerando token com ID:", usuario.id_user);
    const token = jwt.sign(
    { id: usuario.id_user, email: usuario.email, nome: usuario.name }, // Adicione o 'id' aqui
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
    );

    

    const response =  NextResponse.json(
        {
            message: 'Login realizado com sucesso!',
            token: token,
            usuario: {id: usuario.id, name: usuario.name, email: usuario.email}
        }
        , {status: 200}
        
    )

    response.cookies.set('token', token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/', 
    maxAge: 60 * 60 * 24 
    });

    return response;
    
        } catch(error) {
            console.error('Erro na API de login:', error)
            return NextResponse.json(
                {error: 'Erro interno no servidor ao tentar logar.'},
                {status: 500}
            )
        }
}