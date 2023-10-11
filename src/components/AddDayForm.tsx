'use client'

import { DatePicker, Form, TimePicker, Button, message } from "antd"
import { saveDay } from "@/services/horarios"
import { useRouter } from "next/navigation"

type AddDayFormFields = {
    fecha?: { $y: number, $M: number, $D: number }
    hora_inicio?: { $H: number, $m: number }
    hora_fin?: { $H: number, $m: number }
}

export default function AddDayForm() {
    const [messageApi, contextHolder] = message.useMessage()
    const { refresh } = useRouter()

    const onFinish = async ({ fecha, hora_inicio, hora_fin }: AddDayFormFields) => {
        if (!fecha || !hora_inicio || !hora_fin) return
        const fechaString = `${fecha.$D}/${fecha.$M + 1}/${fecha.$y}`
        const horaInicioString = `${hora_inicio.$H}:${hora_inicio.$m}`
        const horaFinString = `${hora_fin.$H}:${hora_fin.$m}`
        const res = await saveDay({ fecha: fechaString, hora_inicio: horaInicioString, hora_fin: horaFinString })
        if (res.ok) {
            messageApi.success('Jornada guardada correctamente')
            refresh()
        } else {
            messageApi.error('Error al guardar la jornada')
        }
    }

    const onFinishFailed = () => {
        messageApi.error('Error al guardar la jornada')
    }

    return (
        <>
            {contextHolder}
            <Form
                data-form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="grid gap-4 grid-cols-2"
            >
                <Form.Item
                    label="Fecha de la jornada"
                    name="fecha"
                    rules={[{ required: true, message: 'Por favor introduce la fecha de la jornada' }]}
                    className="col-span-2"
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Hora de entrada"
                    name="hora_inicio"
                    rules={[{ required: true, message: 'Por favor introduce la hora de entrada' }]}
                >
                    <TimePicker format="HH:mm" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Hora de salida"
                    name="hora_fin"
                    rules={[{ required: true, message: 'Por favor introduce la hora de salida' }]}
                >
                    <TimePicker format="HH:mm" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Add Day</Button>
                </Form.Item>
            </Form>
        </>
    )
}