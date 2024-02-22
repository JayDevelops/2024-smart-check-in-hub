"use client"
import {signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function SignOutButton() {
    const router = useRouter()

    const handleSignOut = async () => {
        const data = await signOut({redirect: false, callbackUrl: "/"});
        router.push(data.url);
    }

    return (
        <Button
            onClick={handleSignOut}
            variant="outline"
        >
            Sign Out
        </Button>
    )
}