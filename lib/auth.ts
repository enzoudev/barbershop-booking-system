import { jwtVerify } from "jose";

export async function getUserFromToken(token: string) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        
        const { payload } = await jwtVerify(token, secret);
        

        return { 
            id: payload.id as string, 
            name: payload.name as string 
        }; 
    } catch {
        return null;
    }
}