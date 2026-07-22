


export async function changeStatusService(id_appoint: number, status: string) {
    try{
        
        const res = await fetch('/api/admin/changeStatus',{
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({id_appoint, status})
        })

        if(!res.ok) {
            const errorData = await res.json();
            console.error("Erro retornado pela API:", errorData);
           throw new Error(errorData.message || "Falha no login");
        }

        const data = await res.json();
        console.log('Sucesso!');
        return data
    } catch(err) {
        console.error("Erro na comunicação: ", err);
        throw err
    }
}