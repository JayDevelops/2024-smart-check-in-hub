/**
 * GuestPage Component
 *
 * This component allows the rendering of the Guest page in the application.
 * It uses the search parameters input to query for guests from the database
 * and display the result in a GuestTable component. When no guests are found,
 * it displays a relevant message to the user.
 *
 * @component
 *
 * @param {object} props - Component props
 * @param {GuestQuery} props.searchParams - Query parameters to search for guests.
 *
 * @returns {JSX.Element} Rendered GuestPage component
 *
 */
import {HeadingOne, HeadingThree} from "@/components/Typography/Headers";
import { GuestStatus, Location } from "@prisma/client";
import prisma from "@/prisma/client";
import GuestTable from "@/app/guests/GuestTable";
import  {columns} from "@/app/guests/GuestsColumns"
import GuestLocationFilter from "@/app/GuestLocationFilter";
import CurrentLocationName from "@/app/guests/CurrentLocationName";

interface GuestPageProps {
    searchParams: GuestQuery,
    location: Location,
}
export interface GuestQuery {
    status: GuestStatus,
    location: Location,
}

export default async function GuestPage({searchParams}: GuestPageProps) {
    //  Grab the values of guest status
    const statusTypes: GuestStatus[] = Object.values(GuestStatus)

    //  Get the search params of the status and location of the passed in user
    const status  = statusTypes.includes(searchParams.status) ? searchParams.status : undefined

    //  Grab the location id when it is bigger than 0
    let locationId;
    if(Number(searchParams.location) > 0) {
        locationId = Number(searchParams.location)
    }

    //  Update the prisma query with the destructured where the above status and location
    const where = {status, locationId}

    //  Grab the entire locations list from prisma
    const locations = await prisma.location.findMany()

    //  Grab the locationName from the search params
    const locationName: string = locations.filter(location => location.id === locationId!).map(location => location.name)[0]

    //  Find the guests with the above "where" condition
    const guests = await prisma.guest.findMany({
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

    //  Else return the GuestTable with the top location filter
    return (
        <section className="dashboard-page">
            <CurrentLocationName locationName={locationName} className="mb-2" />
            <GuestLocationFilter locations={locations} pathTo={"/guests"} />

            <div className="mx-auto py-4">
                <GuestTable columns={columns} data={guests} />
            </div>
        </section>
    )
}

// // Tells Next.js to dynamically re-rendering at browser refresh
// export const dynamic = 'force-dynamic'