type Horario = {
    fecha: string,
    hora_inicio: string,
    hora_fin: string,
    total_horas: number,
}

type Horarios = {
    [key: string]: {
        [key: string]: {
            days: Horario[],
            total_horas: number
        }
    } & { total_horas: number }
}

export type { Horario, Horarios }