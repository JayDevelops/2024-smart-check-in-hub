"use client"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {useState} from "react";
import {menuLinks} from "@/components/Navigation/NavigationLinks";
import Link from "next/link";
import {CompanyLogo} from "@/components/Navigation/NavBar";

interface MobileNavigationProps {
    sheetTriggerStyle: string,
}

export default function MobileNavigation({sheetTriggerStyle}: MobileNavigationProps) {
    const [open, setOpen] = useState(false)

    const closeSheet = () => {
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className={sheetTriggerStyle} >
                <MobileMenuIcon />
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader className="mt-4">
                    <SheetTitle onClick={closeSheet}>
                        <CompanyLogo />
                    </SheetTitle>


                    <div className="h-full w-full rounded-[inherit] py-4">
                        <div className="text-secondary-foreground text-lg text-left ml-10">
                            <div className="flex flex-col space-y-4" onClick={closeSheet}>
                                {menuLinks.map((menuLink) => (
                                    <Link href={menuLink.href} key={menuLink.id}>
                                        {menuLink.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}

function MobileMenuIcon() {
    return (
        <svg strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
            <path d="M3 5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round"></path>
            <path d="M3 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round"></path>
            <path d="M3 19H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round"></path>
        </svg>
    )
}