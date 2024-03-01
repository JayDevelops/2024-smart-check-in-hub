import {GuestStatus} from "@prisma/client";
import {Badge} from "@/components/ui/badge";

const guestStatusMap: Record<GuestStatus, {label: string, badgeVariant: 'default' | 'warning' | 'destructive'}> = {
    CHECKED_IN: {
        label: 'Checked In',
        badgeVariant: 'default'
    },
    ON_PREMISES: {
        label: 'On Premises',
        badgeVariant: 'warning',
    },
    CHECKED_OUT: {
        label: 'Checked Out',
        badgeVariant: 'destructive',
    },
}

export default function GuestStatusBadge({status}: {status: GuestStatus}) {
    return (
        <Badge variant={guestStatusMap[status].badgeVariant}>
            {guestStatusMap[status].label}
        </Badge>
    )
}