


export async function logoutService() {
    try {
        const res = await fetch('/api/logout', {
            method: 'POST',
            headers: { 'Content-type': 'application/json'}
        })
    if(!res.ok) {
        const errorData = await res.json();
        console.error("Erro retornado pela API:", errorData);
        throw new Error(errorData.message || "Falha no Logout");
    }

    const data = await res.json();
    console.log("Logout realizado com sucesso!")
    return data
    } catch(error) {
        console.error("Erro na comunicação: ", error)
    }
}