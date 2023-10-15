import { Horarios } from '@/@types/horario'
import getHoursDifference from '@/utils/getHoursdifference'

const revalidateTotalHoras = (horarios: Horarios) => {
    for (const month in horarios) {
        horarios[month].total_horas = 0
        if (month === 'total_horas') continue
        for (const week in horarios[month]) {
            if (week === 'total_horas') continue
            horarios[month][week].total_horas = 0
            for (const day of horarios[month][week].days) {
                day.total_horas = getHoursDifference(day.hora_inicio, day.hora_fin)
                horarios[month][week].total_horas += day.total_horas
            }
            horarios[month].total_horas += horarios[month][week].total_horas
        }
    }
    return horarios
}

export default revalidateTotalHoras