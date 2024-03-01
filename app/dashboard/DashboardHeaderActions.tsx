import {CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import GuestLocationFilter from "@/app/GuestLocationFilter";
import {Location} from "@prisma/client";

export default function DashboardHeaderActions({locations}: {locations: Location[]}) {
    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex gap-8">
                <CardTitle className="text-3xl">DashBoard</CardTitle>
                <GuestLocationFilter locations={locations} pathTo={"/dashboard"} />
            </div>

            <div className="flex items-center space-x-4">

                <Link className={buttonVariants({ variant: "default" })} href="">
                    Download
                </Link>
            </div>
        </div>
    )
}