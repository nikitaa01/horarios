'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button, DatePicker, Form, TimePicker, message } from "antd"
import { useRouter } from "next/navigation"

type AddDayFormFields = {
    fecha?: { $y: number, $M: number, $D: number }
    hora_inicio?: { $H: number, $m: number }
    hora_fin?: { $H: number, $m: number }
}

export default function AddDayForm() {
    const supabase = createClientComponentClient()
    const [messageApi, contextHolder] = message.useMessage()
    const { refresh } = useRouter()

    const onFinish = async ({ fecha, hora_inicio, hora_fin }: AddDayFormFields) => {
        if (!fecha || !hora_inicio || !hora_fin) return
        const fechaString = `${fecha.$D}/${fecha.$M + 1}/${fecha.$y}`
        const horaInicioString = `${hora_inicio.$H}:${hora_inicio.$m}`
        const horaFinString = `${hora_fin.$H}:${hora_fin.$m}`
        const hideLoadingMessage = messageApi.loading('Guardando jornada...')
        const { data: { user } } = await supabase.auth.getUser()
        if (!user || !user.id) {
            hideLoadingMessage()
            messageApi.error('No estas logueado')
            return
        }
        const newDay = { fecha: fechaString, hora_inicio: horaInicioString, hora_fin: horaFinString, user_id: user.id }
        const res = await supabase.from('horarios').insert([newDay])
        hideLoadingMessage()
        if (!res.error) {
            messageApi.success('Jornada guardada correctamente')
            refresh()
        } else {
            const { status } = res
            let message = 'Error al guardar la jornada'
            if (status === 409) message = 'Ya existe una jornada con esta fecha (puedes modificarla en la tabla)'
            messageApi.error(message)
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
                    <TimePicker disabledTime={() => ({ disabledHours: () => [3, 4, 5, 6, 7, 8, 9, 10, 11] })} minuteStep={15} format="HH:mm" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Hora de salida"
                    name="hora_fin"
                    rules={[{ required: true, message: 'Por favor introduce la hora de salida' }]}
                >
                    <TimePicker disabledTime={() => ({ disabledHours: () => [3, 4, 5, 6, 7, 8, 9, 10, 11] })} minuteStep={15} format="HH:mm" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Guardar</Button>
                </Form.Item>
            </Form>
        </>
    )
}