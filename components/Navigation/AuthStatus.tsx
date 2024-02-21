import {useSession} from "next-auth/react";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";
import {NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {LogOut, User} from "lucide-react";
import React from "react";

export default function AuthStatus() {
    const { status, data: session} = useSession()

    if(status === "loading") return <Skeleton className="h-12 w-12 rounded-full" />

    //  If no user is logged in, return login component
    if(status === "unauthenticated") {
        return (
            <Link href="/api/auth/signin" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Log In
                </NavigationMenuLink>
            </Link>
        )
    }

    //  Default renders the user details and logout component
    return (
        <NavigationMenuItem className="flex items-center space-x-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={session?.user?.image!} referrerPolicy="no-referrer"  />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled>
                        <User className="mr-2 h-4 w-4" />
                        {session?.user?.email}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/api/auth/signout">
                            <LogOut className="mr-2 h-4 w-4" />
                            Log Out
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </NavigationMenuItem>
    )
}