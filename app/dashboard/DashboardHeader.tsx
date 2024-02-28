import {CardTitle} from "@/components/ui/card";
import {Text} from "@/components/Typography/Text";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

export default function DashboardHeader() {
    return (
        <>
            <CardTitle>DashBoard</CardTitle>

            <div className="flex items-center space-x-4">
                <Text>Date Picker Goes Here</Text>

                <Link className={buttonVariants({ variant: "default" })} href="">
                    Download
                </Link>
            </div>
        </>
    )
}