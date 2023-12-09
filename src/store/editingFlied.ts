import { create } from "zustand"

interface EditingFliedState {
  editingFlied: string | false
  setEditingFlied: (editingFlied: string | false) => void
}

const useEditingFlied = create<EditingFliedState>((set) => ({
  editingFlied: false,
  setEditingFlied: (editingFlied) => set({ editingFlied }),
}))

export default useEditingFlied