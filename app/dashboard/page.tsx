import {Card} from "@/components/ui/card";
import DashboardHeader from "@/app/dashboard/DashboardHeader";
import GuestSummaryCards from "@/app/dashboard/GuestSummaryCards";
import LatestGuests from "@/app/dashboard/LatestGuests";
import prisma from "@/prisma/client";

export default async function Dashboard() {
    //  Get each count of checked_in and checked_out
    const checkedIn = await prisma.guest.count({
        where: {status: "CHECKED_IN"}
    })

    const checkedOut = await prisma.guest.count({
        where: {status: "CHECKED_OUT"}
    })

    return (
        <section className="dashboard-page">
            <Card className="flex-1 space-y-8 p-6">
                <div className="flex items-center justify-between space-y-4">
                    <DashboardHeader/>
                </div>

                <GuestSummaryCards checkedIn={checkedIn} checkedOut={checkedOut}/>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <LatestGuests />
                </div>
            </Card>
        </section>
    )
}
