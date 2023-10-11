import { Horario } from "@/@types/horario"
import { Table } from "antd"

export default function DaysTable({ days }: { days: Horario[] }) {
    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
        },
        {
            title: 'Entrada',
            dataIndex: 'entrada',
            key: 'entrada',
        },
        {
            title: 'Salida',
            dataIndex: 'salida',
            key: 'salida',
        },
        {
            title: 'Horas',
            dataIndex: 'horas',
            key: 'horas',
        },
    ]

    const simplifyFecha = (fecha: string) => {
        const [day, month] = fecha.split('/')
        return `${day}/${month}`
    }

    const data = days.map(({ fecha, hora_fin, hora_inicio, total_horas }) => ({
        key: fecha,
        fecha: simplifyFecha(fecha),
        entrada: hora_inicio,
        salida: hora_fin,
        horas: total_horas,
    }))

    return (
        <Table columns={columns} dataSource={data} pagination={false} />
    )
}