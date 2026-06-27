

export async function authenticateUser(credentials: any) {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials),
    });

    if(!res.ok) {
        throw new Error("Falha no login")
    }

    return res.json(); // Retorna o token, por exemplo
}