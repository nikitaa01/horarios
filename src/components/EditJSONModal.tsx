'use client'

import { actionEditJSON as editJSON } from "@/actions/editJSON"
import { Button, Drawer, FloatButton, message } from "antd"
import TextArea from "antd/es/input/TextArea"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

export default function EditJSONModal({ json }: { json: string }) {
    const [open, setOpen] = useState(false)
    const [localeJSON, setLocaleJSON] = useState(json)
    const { refresh } = useRouter()
    const [messageApi, contextHolder] = message.useMessage()
    const [actionEditJSONState, actionEditJSON] = useFormState(editJSON, { status: null })

    useEffect(() => {
        if (actionEditJSONState.status) {
            setOpen(false)
            refresh()
            messageApi.success('JSON guardado correctamente')
            setTimeout(() => setLocaleJSON(json), 500)
        } else if (actionEditJSONState.status === false) {
            messageApi.error('Error al guardar el JSON')
        }
    }, [actionEditJSONState.status, messageApi, refresh, actionEditJSONState])

    useEffect(() => {
        setLocaleJSON(json)
    }, [json])

    return (
        <>
            {contextHolder}
            <FloatButton icon={(<Image alt="json icon" height={70} width={70} src="/json.png" />)} onClick={() => setOpen(true)} />
            <Drawer open={open} onClose={() => setOpen(false)}>
                <form className="flex flex-col gap-4 !h-full" action={actionEditJSON}>
                    <Pending messageApi={messageApi} />
                    <TextArea
                        name="json"
                        className="!h-full flex-grow"
                        value={localeJSON}
                        onChange={e => setLocaleJSON(e.target.value)}
                    />
                    <Button htmlType="submit" type="primary">Guardar</Button>
                </form>
            </Drawer>
        </>
    )
}

const Pending = ({ messageApi }: any) => {
    const { pending } = useFormStatus()

    useEffect(() => {
        if (pending) {
            messageApi.loading('Guardando JSON')
        } else {
            messageApi.destroy()
        }
    }, [pending, messageApi])

    return null
}