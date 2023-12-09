import { Horarios } from "@/@types/horario"
import dbQuery from "@/utils/dbQuery"
import EditJSONModal from "./EditJSONModal"
import Stats from "./Stats"

export const dynamic = 'force-dynamic'

export default async function HorariosRoot() {
  const { data: horarios } = await dbQuery(c => c.findOne({})) as Horarios
  if (!horarios) {
    return null
  }
  delete horarios._id
  return (
    <>
      <div className="pb-[10vh]">
        <Stats horarios={horarios} />
      </div>
      <EditJSONModal json={JSON.stringify(horarios, null, 6)} />
    </>
  )
}