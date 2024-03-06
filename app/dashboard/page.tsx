import {Card} from "@/components/ui/card";
import GuestSummaryCards from "@/app/dashboard/GuestSummaryCards";
import LatestGuests from "@/app/dashboard/LatestGuests";
import prisma from "@/prisma/client";
import {GuestQuery} from "@/app/guests/list/page";
import {Location} from "@prisma/client";
import DashboardHeaderActions from "@/app/dashboard/DashboardHeaderActions";
interface DashboardProps {
    searchParams: GuestQuery,
    location: Location,
}

export default async function Dashboard({searchParams}: DashboardProps) {
    //  Grab the location id when it is bigger than 0
    let locationId;
    if(Number(searchParams.location) > 0) {
        locationId = Number(searchParams.location)
    }

    //  Get each count the guests checked in at the specified locationId
    const checkedIn = await prisma.guest.count({
        where: {status: "CHECKED_IN", locationId: locationId}
    })

    //  Get each count the guests checked out at the specified locationId
    const checkedOut = await prisma.guest.count({
        where: {status: "CHECKED_OUT", locationId: locationId}
    })


    //  Grab the entire locations list from prisma
    const locations = await prisma.location.findMany()

    return (
        <section className="dashboard-page">
            <Card className="flex-1 space-y-8 p-6">
                <div className="p-3 space-y-4">
                    <DashboardHeaderActions locations={locations} />
                </div>

                <GuestSummaryCards checkedIn={checkedIn} checkedOut={checkedOut} locationId={locationId} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <LatestGuests locationId={locationId} />
                </div>
            </Card>
        </section>
    )
}
