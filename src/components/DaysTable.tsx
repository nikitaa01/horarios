'use client'

import { Horario } from "@/@types/horario"
import { Popover, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import DaysTableEditableItem from "./DaysTableEditableItem"
import Pencil from "./icons/Pencil"

export default function DaysTable({ days }: { days: Horario[] }) {
  const onCellDescanso = ({ horas }: { horas: number }) => {
    if (horas === 0) {
      return {
        colSpan: 0
      }
    }
    return {}
  }

  const columns: ColumnsType<{
    key: string;
    fecha: string;
    entrada: string;
    salida: string;
    horas: number;
    id: string;
  }> = [
      {
        title: <EditableColumnLabel>Fecha</EditableColumnLabel>,
        dataIndex: 'fecha',
        key: 'fecha',
        onCell: ({ horas }: { horas: number }) => ({ colSpan: horas === 0 ? 4 : 1 }),
        render: (text: string, { key, horas, id }) => horas === 0 ? <div className="relative w-full">{text} <div className="absolute inset-0 w-full text-center">Descanso</div></div> : <DaysTableEditableItem id={id} text={text} fecha={key} fieldName="fecha" />,
      },
      {
        title: <EditableColumnLabel>Entrada</EditableColumnLabel>,
        dataIndex: 'entrada',
        key: 'entrada',
        onCell: onCellDescanso,
        render: (text: string, { key, id }) => <DaysTableEditableItem id={id} text={text} fecha={key} fieldName="hora_inicio" />,
      },
      {
        title: <EditableColumnLabel>Salida</EditableColumnLabel>,
        dataIndex: 'salida',
        key: 'salida',
        render: (text: string, { key, id }) => <DaysTableEditableItem id={id} text={text} fecha={key} fieldName="hora_fin" />,
        onCell: onCellDescanso
      },
      {
        title: 'Horas',
        dataIndex: 'horas',
        key: 'horas',
        onCell: onCellDescanso
      },
    ]

  const simplifyFecha = (fecha: string) => {
    const [day, month] = fecha.split('/')
    return `${day}/${month}`
  }

  const data = days.map(({ fecha, hora_fin, hora_inicio, total_horas, id }) => ({
    key: fecha,
    fecha: simplifyFecha(fecha),
    entrada: hora_inicio,
    salida: hora_fin,
    horas: total_horas,
    id
  }))

  return (
    <Table columns={columns} dataSource={data} pagination={false} />
  )
}

const EditableColumnLabel = ({ children }: { children: string }) => {
  return (
    <div className="w-full h-full">
      <span>{children}</span>
      <Popover
        title="Esta columna es editable"
        content="Doble click en un campo para editarlo"
      >
        <div
          className="absolute top-0 right-0 p-1 cursor-pointer h-full flex items-center justify-center"
        >
          <Pencil className="text-blue-500" sizePx={16} />
        </div>
      </Popover>
    </div>
  )
}