import AddDayForm from "@/components/AddDayForm"
import HorariosRoot from "@/components/HorariosRoot"
import StatsLoading from "@/components/StatsLoading"
import { Suspense } from "react"
import "./home.css"

export const dynamic = 'force-dynamic'

export default async function Home() {
    return (
        <>
            <AddDayForm />
            <Suspense fallback={<StatsLoading />}>
                <HorariosRoot />
            </Suspense>
        </>
    )
}
