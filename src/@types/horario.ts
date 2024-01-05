type Horario = {
    fecha: string,
    hora_inicio: string,
    hora_fin: string,
    total_horas: number,
    id: string
}

type Horarios = {
    [key: string]: {
        [key: string]: {
            days: Horario[],
            total_horas: number
        }
    } & { total_horas: number }
} | any

export type { Horario, Horarios }
