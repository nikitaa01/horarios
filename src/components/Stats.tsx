import type { CollapseProps } from 'antd'
import { Collapse } from 'antd'
import InitHorariosStore from "./InitHorariosStore"
import MonthStatsHeader from "./MonthStatsHeader"
import WeekStatsRoot from "./WeekStatsRoot"

interface HorariosWithTotalHoras {
    [month: string]: {
        total_horas: number;
        [week: string]: any;
    }
}

export default function Stats({ horarios }: { horarios: HorariosWithTotalHoras }) {
    if (Object.keys(horarios).length < 1) return null
    const items: CollapseProps['items'] = Object.entries(horarios).map(([month, { total_horas, ...weeks }]) => ({
        key: month,
        label: MonthStatsHeader({ month, totalHours: total_horas }),
        children: <WeekStatsRoot weeks={weeks} />
    }))

    return (
        <>
            <InitHorariosStore horarios={horarios} />
            <div>
                <Collapse items={items} />
            </div>
        </>
    )
}