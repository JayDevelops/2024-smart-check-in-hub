"use client"
import {GuestStatus} from "@prisma/client";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {ReadonlyURLSearchParams, useRouter, useSearchParams} from "next/navigation";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

type statusLabelValue = {
    label: string,
    value?: GuestStatus,
}

const statuses: statusLabelValue[] = [
    {label: "Status: All"},
    {label: "Checked In", value: "CHECKED_IN"},
    {label: "Checked Out", value: "CHECKED_OUT"},
]

export default function GuestStatusFilter() {
    const router: AppRouterInstance = useRouter()
    const searchParams: ReadonlyURLSearchParams = useSearchParams()

    const onSelectChange = (status: string) => {
        const params: URLSearchParams = new URLSearchParams()

        // If there is a status, then append the status to the passed status parameter
        if(status) params.append("status", status)

        // If there is a parameter with location, then append to the query parameters
        if(searchParams.get("location")) {
            params.append("location", searchParams.get("location")!)
        }

        //  If the passed status is set to "All" then return a blank query, else set to mapped status
        const query = params.size ? "?" + params.toString(): ""
        router.push(`/guests${query}`)
    }

    return (
        <Select defaultValue={searchParams.get("status") || ""} onValueChange={onSelectChange}>
            <SelectTrigger className="flex items-center w-[50%] md:w-[100%]">
                <SelectValue placeholder="Filter By Status..." />
                <SelectContent>
                    {statuses.map((status, index) => (
                        <SelectItem key={index} value={status.value ?? 'ALL'}>
                            {status.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectTrigger>
        </Select>
    )
}