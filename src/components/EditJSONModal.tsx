'use client'

import { Button, Drawer, FloatButton, message } from "antd"
import TextArea from "antd/es/input/TextArea"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditJSONModal() {
    const [open, setOpen] = useState(false)
    const [jsonInput, setJsonInput] = useState<string>('')
    const [reload, setReload] = useState(false)
    const { refresh } = useRouter()
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        setReload(false)
        fetch('/api/horarios')
            .then(res => res.json())
            .then(res => {
                setJsonInput(JSON.stringify(res.data, null, 4))
            })
    }, [reload])

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch('/api/horarios', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonInput
        })
        const data = await res.json()
        if (data.ok) {
            setOpen(false)
            refresh()
            messageApi.success('JSON guardado correctamente')
            setReload(true)
        } else {
            messageApi.error('Error al guardar el JSON')
        }
    }

    return (
        <>
            {contextHolder}
            <FloatButton icon={(<Image alt="json icon" height={70} width={70} src="/json.png" />)} onClick={() => setOpen(true)} />
            <Drawer open={open} onClose={() => setOpen(false)}>
                <form onSubmit={handleSave} className="flex flex-col gap-4 !h-full">
                    <TextArea
                        name="json"
                        className="!h-full flex-grow"
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                    />
                    <Button htmlType="submit" type="primary">Guardar</Button>
                </form>
            </Drawer>
        </>
    )
}