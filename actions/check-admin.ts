'use server' 

import { cookies } from 'next/headers';
import { getUserFromToken } from '@/lib/auth';

export async function checkIsAdminAction() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return false;

        const user = await getUserFromToken(token);
        return user?.role === 'admin';
    } catch {
        return false;
    }
}