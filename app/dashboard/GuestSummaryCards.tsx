import {Card} from "@/components/ui/card";
import {GuestStatus} from "@prisma/client";
import {Text} from "@/components/Typography/Text";
import Link from "next/link";

interface GuestSummaryCardsProps {
    checkedIn: number,
    checkedOut: number,
    locationId: number | undefined,
}
interface Container {
    label: string,
    value: number,
    status: GuestStatus,
}

export default async function GuestSummaryCards({checkedIn, checkedOut, locationId}: GuestSummaryCardsProps) {
    const containers: Container[] = [
        {label: "Checked In", value: checkedIn, status: "CHECKED_IN"},
        {label: "On Premises", value: checkedIn, status: "ON_PREMISES"},
        {label: "Checked Out", value: checkedOut, status: "CHECKED_OUT"},
    ]

    return (
        <div className="grid grid-cols-3 gap-8">
            {containers.map((container, index) => (
                <Card className="space-y-4" key={index}>
                    <div className="flex flex-col gap-1 p-4">
                        <LinkToGuests containerStatus={container.status} locationId={locationId} containerLabel={container.label} />
                        <GuestSummaryCardText containerValue={container.value} />
                    </div>
                </Card>
            ))}
        </div>
    )
}

function GuestSummaryCardText({containerValue}: {containerValue: number}) {
    return (
        <Text className="font-bold">{containerValue}</Text>
    )
}

function LinkToGuests({containerStatus, containerLabel, locationId}: {containerStatus: GuestStatus, containerLabel: string, locationId: number | undefined}) {
    if(!locationId) {
        return <Link className="text-lg font-medium underline underline-offset-2" href={`/guests/list?status=${containerStatus}`}>{containerLabel}</Link>
    }

    return (
        <Link className="text-lg font-medium underline underline-offset-2" href={`/guests/list?status=${containerStatus}&location=${locationId}`}>
            {containerLabel}
        </Link>
    )
}