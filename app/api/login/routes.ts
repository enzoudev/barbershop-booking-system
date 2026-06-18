import { NextResponse } from 'next/server'
import { pool } from '@/lib/database'

export async function POST( req: Request) {
    try {
        const body = await req.json();
        const {email, password} = body
        if(!email || !password) {
            return NextResponse.json( {error: 'Algum campo obrigatório está em branco!'}, {status: 400})
        }

    const [usuarios]: any = pool.query( 'SELECT * FROM usuarios WHERE = ?', [email])


    if(usuarios.length == 0) {
        return NextResponse.json( {error: 'Email/usuário ou senha incorretos'}, {status: 400})
    }
    
    const usuario = usuarios[0]
    if(usuario.password !== password) {
        return NextResponse.json( {error: 'Senha incorreta.'}, {status: 401})
    }

    return NextResponse.json(
        {
            message: 'Login realizado com sucesso!',
            usuario: {id: usuario.id, nome: usuarios.nome, email: usuario.email}
        }
        , {status: 200}
        
    )

        } catch(error) {
            console.error('Erro na API de login:', error)
            return NextResponse.json(
                {error: 'Erro interno no servidor ao tentar logar.'},
                {status: 500}
            )
        }
}