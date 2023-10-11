import AddDayForm from "@/components/AddDayForm"
import EditJSONModal from "@/components/EditJSONModal"
import Stats from "@/components/Stats"

import horarios from "@/data/horarios.json"

export default function Home() {
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
