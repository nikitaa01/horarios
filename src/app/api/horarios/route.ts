import { Horario, Horarios } from "@/@types/horario"
import horariosJSON from '@/data/horarios.json'
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from "next/server"
import zod from 'zod'

const horarios: Horarios = horariosJSON

export function GET() {
    return NextResponse.json(horarios)
}

function calcularDiferenciaDeHoras(horaInicio: string, horaFinal: string) {
    if (+horaFinal.split(':')[0] < 4) {
        horaFinal = `${+horaFinal.split(':')[0] + 24}:${horaFinal.split(':')[1]}`
    }
    const [horaInicioHoras, horaInicioMinutos] = horaInicio.split(':')
    const [horaFinalHoras, horaFinalMinutos] = horaFinal.split(':')

    const inicioEnMinutos = parseInt(horaInicioHoras) * 60 + parseInt(horaInicioMinutos)
    const finalEnMinutos = parseInt(horaFinalHoras) * 60 + parseInt(horaFinalMinutos)

    const diferenciaEnMinutos = finalEnMinutos - inicioEnMinutos

    const diferenciaEnHoras = diferenciaEnMinutos / 60

    return diferenciaEnHoras
}

function getWeekIndex(fecha: Date) {
    const monthStart = new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay()
    const adjustedMonthStart = (monthStart === 0 ? 7 : monthStart)
    const weekIndex = Math.ceil((fecha.getDate() + adjustedMonthStart - 1) / 7)
    return weekIndex
}

export async function POST(req: NextRequest) {
    let newHorario: { horario: Horario }
    try {
        newHorario = await req.json() as { horario: Horario }
    } catch (error) {
        return NextResponse.json({ ok: false, error: 'No se recibieron datos' }, { status: 400 })
    }
    if (!newHorario) return NextResponse.json({ ok: false, error: 'No se recibieron datos' }, { status: 400 })
    const horarioSchema = zod.object({
        fecha: zod.string(),
        hora_inicio: zod.string(),
        hora_fin: zod.string(),
    })
    const validated = horarioSchema.safeParse(newHorario)
    if (!validated.success) {
        return NextResponse.json({ ok: false, error: JSON.parse(validated.error.message) })
    }

    const total_horas = calcularDiferenciaDeHoras(validated.data.hora_inicio, validated.data.hora_fin)

    const [day, month, year] = validated.data.fecha.split('/')
    const monthSelector = `${month}/${year}`
    const weekSelector = getWeekIndex(new Date(+year, +month - 1, +day))

    if (!horarios[monthSelector]) horarios[monthSelector] = {
        total_horas: 0
    }
    if (!horarios[monthSelector][weekSelector]) horarios[monthSelector][weekSelector] = {
        days: [],
        total_horas: 0
    }

    horarios[monthSelector].total_horas += total_horas
    horarios[monthSelector][weekSelector].total_horas += total_horas
    horarios[monthSelector][weekSelector].days.push({ ...validated.data, total_horas })

    try {
        await writeFile(`${process.cwd()}/src/data/horarios.json`, JSON.stringify(horarios))
    } catch (error) {
        console.log(error)
        return NextResponse.json({ ok: false, error: 'No se han podido actualizar los datos', error2: error })
    }
    return NextResponse.json({ ok: true })
}

const revalidateTotalHoras = (horarios: Horarios) => {
    for (const month in horarios) {
        horarios[month].total_horas = 0
        if (month === 'total_horas') continue
        for (const week in horarios[month]) {
            if (week === 'total_horas') continue
            horarios[month][week].total_horas = 0
            for (const day of horarios[month][week].days) {
                day.total_horas = calcularDiferenciaDeHoras(day.hora_inicio, day.hora_fin)
                horarios[month][week].total_horas += day.total_horas
            }
            horarios[month].total_horas += horarios[month][week].total_horas
        }
    }
    return horarios
}

export async function PUT(req: NextRequest) {
    let newHorarios: Horarios
    try {
        newHorarios = await req.json() as Horarios
    } catch (error) {
        return NextResponse.json({ ok: false, error: 'No se recibieron datos' }, { status: 400 })
    }
    if (!newHorarios) return NextResponse.json({ ok: false, error: 'No se recibieron datos' }, { status: 400 })
    newHorarios = revalidateTotalHoras(newHorarios)
    try {
        await writeFile(`${process.cwd()}/src/data/horarios.json`, JSON.stringify(newHorarios))
    } catch (error) {
        return NextResponse.json({ ok: false, error: 'No se han podido actualizar los datos' })
    }
    return NextResponse.json({ ok: true })
}