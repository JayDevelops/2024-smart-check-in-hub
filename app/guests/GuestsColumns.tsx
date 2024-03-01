"use client"
import {ColumnDef} from "@tanstack/react-table"
import {Guest, GuestStatus} from "@prisma/client";
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
import {GuestTableColumnHeader} from "@/app/guests/GuestTableColumnHeader";
import {useToast} from "@/components/ui/use-toast";
import GuestStatusBadge from "@/components/GuestStatusBadge";

export const columns: ColumnDef<Guest>[] = [
    {
        accessorKey: "fullName",
        header: ({column}) => (
            <GuestTableColumnHeader column={column} title="Full Name" />
        ),
    },
    {
        accessorKey: "status",
        header: () => <div className="text-left">Status</div>,
        cell: ({row}) => {
            const guestStatus: GuestStatus = row.getValue("status");
            return <GuestStatusBadge status={guestStatus} />
        }
    },
    {
        accessorKey: "signedIn",
        header: () => <div className="text-left"><span className="hidden md:inline-block">Sign</span> In</div>,
        cell: ({row}) => {
            const signInAt: Date = row.getValue("signedIn")
            const formattedTime = formatAmPm(signInAt)
            return <div className="text-left">{formattedTime}</div>
        },
    },
    {
        accessorKey: "signedOut",
        header: () => <div className="text-left"><span className="hidden md:inline-block">Sign</span> Out</div>,
        cell: ({row}) => {
            const signOutAt: Date = row.getValue("signedOut")
            const formattedTime = formatAmPm(signOutAt)
            return <div className="text-left">{formattedTime}</div>
        },
    },
    {
      enableHiding: false,
      id: "actions",
      cell: ({row}) => {
          const guest: Guest = row.original
          return <ActionButton guest={guest} />
      }
    },
]

function ActionButton({guest}: {guest: Guest}) {
    const { toast } = useToast()
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
                <DropdownMenuItem onClick={() => {
                    toast({
                        description: `${guest.fullName} has been successfully copied to your clipboard!`
                    })
                    return navigator.clipboard.writeText(guest.fullName)
                }}>
                    Copy Guest Name
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem>View Guest</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}