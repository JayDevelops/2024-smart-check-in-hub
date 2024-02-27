"use client"
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {ReadonlyURLSearchParams, useRouter, useSearchParams} from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Location} from "@prisma/client";

export default function GuestLocationFilter({locations}: {locations: Location[]}) {
    const router: AppRouterInstance = useRouter()
    const searchParams: ReadonlyURLSearchParams = useSearchParams()

    const onSelectChange = (location: string) => {
        const params: URLSearchParams = new URLSearchParams()

        //  If the Location searchParams does not equal "All", then append it to the passed location parameter
        if(location !== "All") params.append("location", location)

        // If there is a parameter with location, then append to the query parameters
        if(searchParams.get("status")) {
            params.append("status", searchParams.get("status")!)
        }

        const query = params.size ? "?" + params.toString(): ""
        router.push(`/guests${query}`)
    }

    //  Include "ALL" label to the other locations passed from the props

    return(
        <Select defaultValue={searchParams.get("location") || ""} onValueChange={onSelectChange}>
            <SelectTrigger className="flex items-center w-[50%] md:w-[30%] mt-2">
                <SelectValue placeholder="Filter By Location..." />
                <SelectContent>
                    <SelectItem value={"All"}>
                        All Locations
                    </SelectItem>
                    {locations.map((location: Location, index) => (
                        <SelectItem key={index} value={location.id.toString() ?? 'ALL'}>
                            {location.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectTrigger>
        </Select>
    )
}