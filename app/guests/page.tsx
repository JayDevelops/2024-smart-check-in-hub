import {HeadingOne, HeadingThree} from "@/components/Typography/Headers";
import { GuestStatus } from "@prisma/client";
import GuestTable from "@/app/guests/GuestTable";
import  {columns} from "@/app/guests/GuestsColumns"

interface GuestPageProps {
    searchParams: GuestQuery,
}
export interface GuestQuery {
    status: GuestStatus,
}

export default async function GuestPage({searchParams}: GuestPageProps) {
    const statuses = Object.values(GuestStatus)
    const status  = statuses.includes(searchParams.status) ? searchParams.status : undefined
    const where = {status}

    const guests = await prisma?.guest.findMany({
        where
    })

    //  If there are no guests currently present, pass a heading that there are none
    if(!guests) {
        return (
            <section className="dashboard-page">
                <HeadingOne color="secondary-foreground">Guests Page</HeadingOne>

                <div className="mx-auto py-4">
                    <HeadingThree>
                        No Guest Data Found at the Moment.
                    </HeadingThree>
                </div>
            </section>
        )
    }

    //  Else return the GuestTable
    return (
        <section className="dashboard-page">
            <HeadingOne color="secondary-foreground">Guests Page</HeadingOne>

            <div className="mx-auto py-4">
                <GuestTable columns={columns} data={guests} />
            </div>
        </section>
    )
}

// Tells Next.js to dynamically re-rendering at browser refresh
export const dynamic = 'force-dynamic'
