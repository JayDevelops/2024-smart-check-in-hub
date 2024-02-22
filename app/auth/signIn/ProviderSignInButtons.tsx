"use client"
import { signIn } from "next-auth/react";
import {Button} from "@/components/ui/button";
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export default function SignInButtons() {
    return (
        <>
            {providerLabels.map((providerLabel: ProviderLabel, index: number) => (
                <Button
                    onClick={() => signIn(providerLabel.provider, { callbackUrl: '/' })}
                    variant="outline"
                    key={index}
                >
                    {providerLabel.logo} <span>&nbsp; &nbsp;</span> {providerLabel.buttonLabel}
                </Button>
            ))}
        </>
    )
}

const providerLabels: ProviderLabel[] = [
    {
        provider: "github",
        buttonLabel: "Sign In With GitHub",
        logo: <GitHubLogoIcon />,
    },
]
interface ProviderLabel {
    provider: string,
    buttonLabel: string,
    logo: JSX.Element,
}