import Link from "next/link";
import React from "react";
import MobileNavigation from "@/components/Navigation/MobileNavigation";
import LeftDesktopNavLinks from "@/components/Navigation/LeftDesktopNavLinks";
import RightActionLinks from "@/components/Navigation/RightActionLinks";
import UserAuthenticated from "@/components/UserAuthenticated";
import {HeadingFour} from "@/components/Typography/Headers";

export default function NavBar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <MobileNavigation sheetTriggerStyle="block md:hidden pr-3"/>

                {/* RIGHT SIDE OF DESKTOP NAVIGATION */}
                <div className="mr-4 hidden md:flex">
                    <CompanyLogo/>
                    <LeftDesktopNavLinks />
                </div>

                {/* LEFT SIDE OF NAVIGATION BAR, BOTH MOBILE AND DESKTOP */}
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none" /> {/* Hidden, gives space between the left and right nav links*/}
                    <RightActionLinks userAuthenticated={<UserAuthenticated />}/>
                </div>
                </div>
        </header>
    )
}


export function CompanyLogo() {
    return (
        <Link href="/" className="mr-6 flex items-center space-x-2 text-secondary-foreground">
            <HeadingFour color="secondary-foreground" className="sm:inline-block">
                Company Logo
            </HeadingFour>
        </Link>
    )
}