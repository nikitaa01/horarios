import { formatHorarios } from "@/controllers/horarios"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Stats from "./Stats"

export const dynamic = 'force-dynamic'

export default async function HorariosRoot() {
  const supabase = createServerComponentClient({ cookies })
  const horarios = await formatHorarios(supabase)
  if (!horarios) {
    return null
  }
  return (
    <>
      <div className="pb-[10vh]">
        <Stats horarios={horarios} />
      </div>
      {/* <EditJSONModal json={JSON.stringify(horarios, null, 6)} /> */}
    </>
  )
}