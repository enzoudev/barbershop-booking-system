export async function authenticateUser(email: string, password: string) {
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        });


        if (!res.ok) {
            const errorData = await res.json();
            console.error("Erro retornado pela API:", errorData);
            throw new Error(errorData.message || "Falha no login");
        }

        const data = await res.json();
        console.log("Sucesso, dados recebidos:", data);
        return data;
    } catch (err) {
        console.error("Erro na comunicação:", err);
        throw err;
    }
}