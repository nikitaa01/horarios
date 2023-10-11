import { Horario } from "@/@types/horario"

const getStringDay = (days: Horario[]) => {
    return Math.min(...days.map(({ fecha }) => +fecha.split('/')[0]))
}
const getEndingDay = (days: Horario[]) => {
    return Math.max(...days.map(({ fecha }) => +fecha.split('/')[0]))
}

export default function WeekStatsHeader({ totalHours, days }: { totalHours: number, days: Horario[] }) {
    return (
        <>
            <span className="block font-bold">
                En la semana de {getStringDay(days)} a {getEndingDay(days)}
            </span>
            <span className="font-bold">
                has trabajado: {totalHours} horas
            </span>
        </>
    )
}