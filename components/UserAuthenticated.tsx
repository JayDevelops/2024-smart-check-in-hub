
/*
* This component checks if the user is authenticated. If they are then show a dashboard button
* Else show the sign-in button so the user may sign in.
* */
import {User} from "@clerk/nextjs/api";
import {currentUser, SignInButton, UserButton} from "@clerk/nextjs";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import React from "react";

export default async function UserAuthenticated() {
    const user: User | null = await currentUser();

    //  If there is no current signed-in user, then return only the sign-in button and the mode-toggle
    if(!user) {
        return (
            <SignInButton />
        )
    }

    return (
        <div className="flex flex-row items-center gap-x-3 lg:gap-x-4">
            <UserButton afterSignOutUrl="/"/>
        </div>
    );
}