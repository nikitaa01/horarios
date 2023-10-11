import { Horario } from "@/@types/horario"
import { Collapse } from "antd"
import type { CollapseProps } from 'antd'
import WeekStatsHeader from "./WeekStatsHeader"
import DaysTable from "./DaysTable"

export default function WeekStats({ week, totalHours, days }: { week: string, totalHours: number, days: Horario[] }) {
    const items: CollapseProps['items'] = [{
        key: week,
        label: <WeekStatsHeader totalHours={totalHours} days={days} />,
        children: <DaysTable days={days} />
    }]

    return (
        <Collapse className="w-full" items={items} />
    )
}