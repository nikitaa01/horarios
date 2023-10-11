type SaveDay = {
    fecha: string,
    hora_inicio: string,
    hora_fin: string,
}

const saveDay = async (params: SaveDay) => {
    const res = await fetch('/api/horarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'aplication/json'
        },
        body: JSON.stringify(params)
    })
    return await res.json()
}

export { saveDay }