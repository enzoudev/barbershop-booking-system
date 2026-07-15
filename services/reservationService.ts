

export async function reservationService(id_barber: number, date: string, time: string) {
    try {
        const dataCompleta = new Date(`${date}T${time}:00Z`);
        const res = await fetch('/api/appointments', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date_time: dataCompleta.toISOString(),
                id_barber: id_barber
            })
        })

        if(!res.ok) {
            const errorData = await res.json();
            console.error('Erro retornado pela API:', errorData);
            throw new Error(errorData.message || "Falha ao reservar")
        }

        const data = await res.json();
        console.log('Sucesso!')
        return data

    } catch(err) {
        console.error("Erro na comunicação:", err);
        throw err;
    }
}