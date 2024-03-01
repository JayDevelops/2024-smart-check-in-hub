import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import prisma from "@/prisma/client";
import Link from "next/link";
import GuestStatusBadge from "@/components/GuestStatusBadge";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";

export default async function LatestGuests({locationId}: {locationId: number | undefined}) {
    // Return the latest guests where the locationId matches the passed params
    const latestGuests = await prisma.guest.findMany({
        orderBy: {
            signedIn: "asc",
        },
        take: 6,
        where: {
            locationId: locationId,
        }
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Latest Guests</CardTitle>
                <CardDescription>Overview of the latest guests activity.</CardDescription>
            </CardHeader>

            <Table>
                <TableBody>
                    {latestGuests.map((guest) => (
                        <TableRow key={guest.id}>
                            <TableCell>
                                <div className="flex flex-row justify-between">
                                    {/*Guest full name and their status badge*/}
                                    <div className="flex flex-col items-start gap-2">
                                        <Link href={`/guests/${guest.id}`} className="font-bold">
                                            {guest.fullName}
                                        </Link>

                                        <GuestStatusBadge status={guest.status}/>
                                    </div>

                                    <Avatar>
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}