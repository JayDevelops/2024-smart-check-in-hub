import {cache} from "react";
import prisma from "@/prisma/client";
import {getServerSession} from "next-auth/next";
import authOptions from "@/app/api/auth/authOptions";
import {Session} from "next-auth";
import GuestDetails from "@/app/guests/[id]/GuestDetails";
import LocationSelectComboBox from "@/app/guests/[id]/LocationSelectComboBox";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";


interface GuestDetailPageProps {
    params: {id: string},
    previousPath: string,
}

//  Fetch the user with the passed params id
const fetchGuest = cache((guestId: number) => prisma.guest.findUnique({where: {id: guestId}}))

export default async function GuestPage({params} : GuestDetailPageProps) {
    const session: Session | null = await getServerSession(authOptions)

    //  Find/Grab the requested clicked guest
    const guest = await fetchGuest(parseInt(params.id))
    const guestLocation = await prisma.location.findUnique({
        where: {
            id: guest!.locationId
        }
    })

    //  If the issue doesn't exist, then redirect the user to the not-found page
    if(!guest) {
        return <div>Guest not found</div>
    }

    return (
        <div>
            <Breadcrumb className="mb-4">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/guests/list">Guests</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Guest Details for {guest.firstName}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                <div className="md:col-span-4">
                    <GuestDetails guest={guest}/>
                </div>


                {session && <div className="md:mt-0 max-w-full md:col-span-1">
                    <div className="flex flex-col gap-4">
                        <LocationSelectComboBox guestLocation={guestLocation!}/>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

//  Generate dynamic meta data on the guest id details
export async function generateMetadata({params}: GuestDetailPageProps) {
    const guest = await fetchGuest(parseInt(params.id))

    return {
        title: guest?.fullName + " Details",
        description: "Details of guest " + guest?.id,
    }
}