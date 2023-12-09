'use client'

import { Horarios } from "@/@types/horario"
import useHorarios from "@/store/horarios"
import { useEffect } from "react"

export default function InitHorariosStore({ horarios }: { horarios: Horarios }) {
  const setHorarios = useHorarios(state => state.setHorarios)

  useEffect(() => {
    setHorarios(horarios)
  }, [horarios, setHorarios])

  return null
}