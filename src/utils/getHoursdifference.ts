export default function getHoursDifference(horaInicio: string, horaFinal: string) {
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