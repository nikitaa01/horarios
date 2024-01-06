import { Horarios } from "@/@types/horario"
import getHoursDifference from "@/utils/getHoursdifference"
import getWeekIndex from "@/utils/getWeekIndex"
import getWholeWeekFromDate from "@/utils/getWholeWeekFromDate"
import { SupabaseClient } from "@supabase/supabase-js"

const formatHorarios = async (supabase: SupabaseClient<any, "public", any>) => {
  const { data: horarios } = await supabase.from('horarios').select('*')

  if (!horarios) return {}
  horarios.sort((a: { fecha: string }, b: { fecha: string }) => {
    const [dayA, monthA, yearA] = a.fecha.split('/')
    const [dayB, monthB, yearB] = b.fecha.split('/')
    const dateA = new Date(+yearA, +monthA - 1, +dayA)
    const dateB = new Date(+yearB, +monthB - 1, +dayB)
    return dateA.getTime() - dateB.getTime()
  })
  const res: Horarios = {}
  for (const jornada of horarios) {
    const [day, month, year] = jornada.fecha.split('/')
    const date = new Date(+year, +month - 1, +day)
    const monthSelector = `${month}/${year}`
    const jornadaTotalHoras = getHoursDifference(jornada.hora_inicio, jornada.hora_fin)
    if (res[monthSelector]) {
      res[monthSelector].total_horas += jornadaTotalHoras
    } else {
      res[monthSelector] = {
        total_horas: jornadaTotalHoras
      }
    }
    const weekIndex = getWeekIndex(date)

    if (res[monthSelector][weekIndex]) continue

    const days = getWholeWeekFromDate(date).map(fecha => ({ fecha, hora_inicio: -1, hora_fin: -1, total_horas: 0 }))
    res[monthSelector][weekIndex] = {
      days,
      total_horas: 0
    }
    for (let i = 0; i < res[monthSelector][weekIndex].days.length; i++) {
      const horarioFecha = horarios.find(horario => horario.fecha === res[monthSelector][weekIndex].days[i].fecha)
      if (!horarioFecha) continue
      res[monthSelector][weekIndex].days[i] = {
        ...horarioFecha,
        total_horas: getHoursDifference(horarioFecha.hora_inicio, horarioFecha.hora_fin)
      }
      res[monthSelector][weekIndex].total_horas += res[monthSelector][weekIndex].days[i].total_horas
    }
  }

  return res
}

export { formatHorarios }
