import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function GuestLoadingPage() {
    //  Else return the GuestTable with the top location filter
    return (
        <section className="dashboard-page-loading">
            {/*LOADING SKELETONS FOR THE TEXT ABOVE */}
            <Skeleton className="h-10 w-72" />
            <Skeleton className="h-8 w-64 my-3 " />

            {/*LOADING SKELETON FOR LOCATION FILTERING DROPDOWN*/}
            <Skeleton className="h-10 w-52 md:w-96" />

            <div className="mx-auto py-4">

                <div className="flex justify-between py-4">
                    <div className="flex gap-2 md:gap-4">
                        {/* Filter component loading on the left side*/}
                        <Skeleton className="h-10 w-36 md:w-48 hidden md:inline-block" />
                        <Skeleton className="h-10 w-44" />
                    </div>

                    <div className="flex gap-2 md:gap-4">
                        {/* Dropdown filtering loading on the right side*/}
                        <Skeleton className="h-10 w-20" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                </div>

                {/*TABLE LOADING SKELETON BELOW */}
                <Skeleton className="h-96 md:w-[100%] rounded-xl"/>

                {/* PAGINATION LOADING SKELETON ON BOTTOM TO THE RIGHT BELOW */}
                <div className="flex items-center justify-end space-x-2 py-3">
                    <Skeleton className="h-9 w-20" />

                    <Skeleton className="h-9 w-14" />
                </div>
            </div>
        </section>
    )
}