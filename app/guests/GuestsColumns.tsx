"use client"
import {ColumnDef} from "@tanstack/react-table"
import {Guest, GuestStatus} from "@prisma/client";
import {Badge} from "@/components/ui/badge";
import {formatAmPm} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";

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
    {
      id: "actions",
      cell: ({row}) => {
          const guest: Guest = row.original
          return <ActionButton guest={guest} />
      }
    },
]

function ActionButton({guest}: {guest: Guest}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(guest.firstName + " " + guest.lastName)}>
                    Copy Guest Name
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem>View Guest</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

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