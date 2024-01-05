'use client'

import useEditingFlied from "@/store/editingFlied"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button, message } from "antd"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DaysTableEditableItem({ text, fecha, fieldName, id }: { text: string, fecha: string, fieldName: 'fecha' | 'hora_inicio' | 'hora_fin', id: string }) {
  const editing = useEditingFlied(state => state.editingFlied)
  const setEditing = useEditingFlied(state => state.setEditingFlied)
  const fieldId = JSON.stringify({ fecha, fieldName })

  const fieldsRegexPatterns = {
    'fecha': /^\d{1,2}\/\d{1,2}$/,
    'hora_inicio': /^\d{1,2}:\d{1,2}$/,
    'hora_fin': /^\d{1,2}:\d{1,2}$/,
  }

  const setToEditing = () => setEditing(fieldId)
  const setToNoEditing = () => setEditing(false)

  return (
    editing === fieldId
      ? <EditingItem
        id={id}
        fieldName={fieldName}
        setToNoEditing={setToNoEditing}
        defaultValue={text}
        pattern={fieldsRegexPatterns[fieldName]}
      />
      : <NoEditingItem
        setToEditing={setToEditing}
      >
        {text}
      </NoEditingItem>
  )
}

const NoEditingItem = ({ children, setToEditing }: { children: JSX.Element | string, setToEditing: () => void }) => {
  const handleDoubleClick = () => setToEditing()

  return <button
    className="w-full h-full text-left"
    onDoubleClick={handleDoubleClick}
  >
    {children}
  </button>
}

const EditingItem = ({ setToNoEditing, defaultValue, pattern, fieldName, id }: { setToNoEditing: () => void, defaultValue: string, pattern: RegExp, fieldName: string, id: string }) => {
  const [value, setValue] = useState(defaultValue)
  const [error, setError] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const supabase = createClientComponentClient()
  const { refresh } = useRouter()

  let errorTimeout: NodeJS.Timeout
  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(errorTimeout)
    setValue(e.target.value)
    errorTimeout = setTimeout(() => setError(!pattern.test(e.target.value)), 300)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (error) {
      messageApi.error('El valor del campo no cumple con los requisitos')
      return
    }
    let hideLoadingMessage: (() => void) | undefined
    hideLoadingMessage = messageApi.loading('Actualizando el campo')
    const res = await supabase.from('horarios').update({ [fieldName]: value }).eq('id', id)
    hideLoadingMessage && hideLoadingMessage()
    if (res.error) {
      messageApi.error('Error al actualizar el campo')
      return
    }
    message.success('Campo actualizado correctamente')
    refresh()
    setToNoEditing()
  }

  return (
    <>
      {contextHolder}
      <form
        onSubmit={handleSubmit}
        className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center"
      >
        <input
          className={`outline-none py-1 pl-2 w-full m-2 ring-2 rounded-full duration-200 transition-shadow ease-in-out ${error ? 'ring-red-300 focus:ring-red-500' : 'ring-blue-300 focus:ring-blue-500'}`}
          autoFocus
          type="text"
          value={value}
          onChange={handleChanges}
        />
        <SaveEditingControls
          error={error}
          setToNoEditing={setToNoEditing}
        />
      </form>
    </>
  )
}

const SaveEditingControls = ({ setToNoEditing, error }: { setToNoEditing: () => void, error: boolean }) => {
  return (
    <div className="fixed h-[12dvh] top-[88dvh] left-0 z-50 w-full pointer-events-none [&>*]:pointer-events-auto">
      <div
        className="grid grid-cols-2 place-content-center gap-8 max-w-[478px] mx-auto bg-white rounded-lg shadow p-4 border"
      >
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          disabled={error}
        >
          Guardar
        </Button>
        <Button
          htmlType="button"
          danger={true}
          size="large"
          onClick={setToNoEditing}
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
}