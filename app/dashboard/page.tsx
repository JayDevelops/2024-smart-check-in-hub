import {Card, CardContent} from "@/components/ui/card";
import DashboardHeader from "@/app/dashboard/DashboardHeader";
import GuestSummaryCards from "@/app/dashboard/GuestSummaryCards";
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
            <Card className="flex-1 space-y-4 p-6">
                <div className="flex items-center justify-between space-y-2">
                    <DashboardHeader />
                </div>

                <GuestSummaryCards checkedIn={checkedIn} checkedOut={checkedOut}/>

                <CardContent>
                </CardContent>
            </Card>
        </section>
    )
}
