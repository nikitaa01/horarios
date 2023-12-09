import { type Horario } from "@/@types/horario"
import { create } from "zustand"

interface HorariosState {
  horarios: Horario[]
  setHorarios: (horarios: Horario[]) => void
}

const useHorarios = create<HorariosState>((set) => ({
  horarios: [],
  setHorarios: (horarios) => set({ horarios }),
}))

export default useHorarios