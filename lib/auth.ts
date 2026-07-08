import { jwtVerify } from "jose";

export async function getUserFromToken(token: string) {
    try {
        // Precisamos codificar o segredo da mesma forma que fizemos na criação
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        
        const { payload } = await jwtVerify(token, secret);
        
        // Garanta que o TypeScript saiba que id e name existem no payload
        return { 
            id: payload.id as string, 
            name: payload.name as string 
        }; 
    } catch {
        return null;
    }
}