import {HeadingOne} from "@/components/Typography/Headers";
import {Guest, GuestStatus} from "@prisma/client";
import GuestTable from "@/app/guests/GuestTable";
import  {columns} from "@/app/guests/GuestsColumns"

async function getData(): Promise<Guest[]> {
    const defaultStatus: GuestStatus = "CHECKED_IN";
    const checkedOutStatus: GuestStatus = "CHECKED_OUT";
    const currDate: Date = new Date(Date.now());

    return [
        {
            id: 1,
            firstName: "Jesus",
            lastName: "Perez",
            fullName: "Jesus Perez",
            notes: null,
            signedIn: currDate,
            signedOut: null,
            status: defaultStatus,
            locationId: 1,
        },
        {
            id: 2,
            firstName: "Angel",
            lastName: "Santos",
            fullName: "Angel Santos",
            notes: null,
            signedIn: currDate,
            signedOut: null,
            status: checkedOutStatus,
            locationId: 1,
        },
    ]

}
export default async function GuestsPage() {
    const data = await getData()

    return (
        <section className="dashboard-page">
            <HeadingOne color="secondary-foreground">Guests Page</HeadingOne>

            <div className="mx-auto py-4">
                <GuestTable columns={columns} data={data} />
            </div>
        </section>
    )
}
