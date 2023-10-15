import { Horario, Horarios } from "@/@types/horario"
import dbQuery from "@/utils/dbQuery"
import getHoursDifference from "@/utils/getHoursdifference"
import revalidateTotalHoras from "@/utils/revalidateTotalHoras"
import { NextRequest, NextResponse } from "next/server"
import zod from 'zod'


export async function GET() {
    const horarios = await dbQuery(c => c.findOne({})) as Horarios
    delete horarios?.data?._id
    return NextResponse.json(horarios)
}

function getWeekIndex(fecha: Date) {
    const monthStart = new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay()
    const adjustedMonthStart = (monthStart === 0 ? 7 : monthStart)
    const weekIndex = Math.ceil((fecha.getDate() + adjustedMonthStart - 1) / 7)
    return weekIndex
}

export async function POST(req: NextRequest) {
    const horarios = await dbQuery(c => c.findOne({})) as Horarios
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

    const total_horas = getHoursDifference(validated.data.hora_inicio, validated.data.hora_fin)

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
        await dbQuery(c => c.updateOne({}, { $set: horarios }))
    } catch (error) {
        console.log(error)
        return NextResponse.json({ ok: false, error: 'No se han podido actualizar los datos', error2: error })
    }
    return NextResponse.json({ ok: true })
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
        await dbQuery(c => c.updateOne({}, { $set: newHorarios }))
    } catch (error) {
        return NextResponse.json({ ok: false, error: 'No se han podido actualizar los datos' })
    }
    return NextResponse.json({ ok: true })
}