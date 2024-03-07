import {cache} from "react";
import prisma from "@/prisma/client";
import {getServerSession} from "next-auth/next";
import authOptions from "@/app/api/auth/authOptions";
import {Session} from "next-auth";
import GuestDetails from "@/app/guests/[id]/GuestDetails";

interface GuestDetailPageProps {
    params: {id: string}
}

//  Fetch the user with the passed params id
const fetchGuest = cache((guestId: number) => prisma.guest.findUnique({where: {id: guestId}}))

export default async function GuestPage({params}: GuestDetailPageProps) {
    const session: Session | null = await getServerSession(authOptions)

    //  Find/Grab the requested clicked guest
    const guest = await fetchGuest(parseInt(params.id))

    //  If the issue doesn't exist, then redirect the user to the not-found page
    if(!guest) {
        return <div>Guest not found</div>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className="md:col-span-4">
                <GuestDetails guest={guest} />
            </div>


            {session && <div className="md:mt-0 max-w-full md:col-span-1">
                <div className="flex flex-col gap-4">

                </div>
            </div>
            }
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