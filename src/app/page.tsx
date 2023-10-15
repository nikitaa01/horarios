import { Horarios } from "@/@types/horario"
import AddDayForm from "@/components/AddDayForm"
import EditJSONModal from "@/components/EditJSONModal"
import Stats from "@/components/Stats"
import dbQuery from "@/utils/dbQuery"
import "./home.css"


export default async function Home() {
    const { data: horarios } = await dbQuery(c => c.findOne({})) as Horarios
    delete horarios._id
    console.log(horarios)
    return (
        <>
            <div>
                <AddDayForm />
                <Stats horarios={horarios} />
            </div>
            <EditJSONModal />
        </>
    )
}
