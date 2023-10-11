import { Horario } from "@/@types/horario"
import WeekStats from "./WeekStats"

export default function WeekStatsRoot({ weeks }: {
    weeks: {
        [key: string]: {
            days: Horario[],
            total_horas: number
        }
    }
}) {
    return (
        <div className="grid grid-cols-1 place-content-center gap-4 [&:has(table)]:p-4 w-full">
            {Object.entries(weeks).map(([week, { total_horas, days }]) => <WeekStats key={week} week={week} totalHours={total_horas} days={days} />)}
        </div>
    )
}