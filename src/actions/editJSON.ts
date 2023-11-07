'use server'

import dbQuery from "@/utils/dbQuery"
import revalidateTotalHoras from "@/utils/revalidateTotalHoras"

const actionEditJSON = async (_prevState: any, formData: FormData) => {
  const jsonStr = formData.get('json')
  if (!jsonStr)
    return { status: false }
  const json = JSON.parse(jsonStr as string)
  const newHorarios = revalidateTotalHoras(json)
  try {
    await dbQuery(c => c.updateOne({}, { $set: newHorarios }))
  } catch (error) {
    return { status: false }
  }
  return { status: true }
}

export { actionEditJSON }
