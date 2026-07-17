import { jwtVerify } from "jose";

export async function getUserFromToken(token: string) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        
        const { payload } = await jwtVerify(token, secret);
        
        console.log("Conteúdo completo do payload JWT:", payload);
        return { 
            id: payload.id as string, 
            email: payload.email as string, 
            nome: payload.nome as string
        }; 
    } catch {
        return null;
    }
}