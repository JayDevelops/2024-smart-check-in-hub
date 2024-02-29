import {Card} from "@/components/ui/card";
import {GuestStatus} from "@prisma/client";
import {HeadingFour} from "@/components/Typography/Headers";
import {Text} from "@/components/Typography/Text";

interface GuestSummaryCardsProps {
    checkedIn: number,
    checkedOut: number,
}
interface Container {
    label: string,
    value: number,
    status: GuestStatus,
}

export default function GuestSummaryCards({checkedIn, checkedOut}: GuestSummaryCardsProps) {
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
                        <HeadingFour>{container.label}</HeadingFour>
                        <Text className="font-bold">{container.value}</Text>
                    </div>
                </Card>
            ))}
        </div>
    )
}