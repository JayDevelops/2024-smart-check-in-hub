"use client"
import {ColumnDef} from "@tanstack/react-table"
import {Guest, GuestStatus} from "@prisma/client";
import {Badge} from "@/components/ui/badge";
import {formatAmPm} from "@/lib/utils";

export const columns: ColumnDef<Guest>[] = [
    {
        accessorKey: "firstName",
        header: "First Name",
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
    },
    {
        accessorKey: "guestStatus",
        header: () => <div className="text-left">Status</div>,
        cell: ({row}) => {
            const guestStatus: GuestStatus = row.getValue("guestStatus");
            const statusInfo = guestStatusMap[guestStatus]
            return <Badge variant={statusInfo.badgeVariant}>{statusInfo.label}</Badge>
        }
    },
    {
        accessorKey: "checkedInAt",
        header: () => <div className="text-left">Sign In</div>,
        cell: ({row}) => {
            const signInAt: Date = row.getValue("checkedInAt")
            const formattedTime = formatAmPm(signInAt)
            return <div className="text-left">{formattedTime}</div>
        }
    },
    {
        accessorKey: "checkedOutAt",
        header: () => <div className="text-left">Sign Out</div>,
        cell: ({row}) => {
            const signOutAt: Date = row.getValue("checkedOutAt")
            const formattedTime = formatAmPm(signOutAt)
            return <div className="text-left">{formattedTime}</div>
        }
    },
]

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