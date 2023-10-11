export default function MonthStatsHeader({ month, totalHours }: { month: string, totalHours: number }) {
    return (
        <div className="flex items-center font-bold md:text-lg">
            En el mes: {month} has trabajado: {totalHours} horas
        </div>
    )
}