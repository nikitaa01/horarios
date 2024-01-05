import { Horario } from "@/@types/horario"

export default function WeekStatsHeader({ totalHours, days }: { totalHours: number, days: Horario[] }) {
    return (
        <>
            <span className="block font-bold">
                En la semana de {days[0].fecha} a {days.at(-1)!.fecha}
            </span>
            <span className="font-bold">
                has trabajado: {totalHours} horas
            </span>
        </>
    )
}