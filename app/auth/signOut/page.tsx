import { getServerSession } from "next-auth/next"
import authOptions from "@/app/api/auth/authOptions"
import {BlockQuote, Text} from "@/components/Typography/Text";
import {HeadingOne} from "@/components/Typography/Headers";
import {Card} from "@/components/ui/card";
import SignOutButton from "@/app/auth/signOut/SignOutButton";

export default async function SignOutPage() {
    //  Get server session, if user isn't authenticated then return 401 status codes
    const session = await getServerSession(authOptions)

    // If the user is not logged in, redirect to home page to avoid an infinite loop!
    if (!session) {
        return { redirect: { destination: "/" } }
    }

    return (
        <Card className="overflow-hidden">
            <div
                className="container relative h-[700px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
            >
                {/*LEFT SIDE*/}
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900"></div>

                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-6 w-6">
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
                        </svg>
                        Company Inc.
                    </div>
                    <div className="relative z-20 mt-auto">
                        <BlockQuote className="space-y-2">
                            <p className="text-lg">
                                Hard work always pays off, whatever you do.
                            </p>
                        </BlockQuote>
                        <footer className="text-sm mt-4">Dustin Lynch</footer>
                    </div>
                </div>

                {/*RIGHT SIDE AND SHOWS ON MOBILE AS WELL*/}
                <div className="lg:p-6">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center mt-48 md:mt-0">
                            <HeadingOne>
                                Sign Out
                            </HeadingOne>

                            <Text variant="small" className="text-muted-foreground">
                                Are you sure you want to sign out?
                            </Text>
                        </div>

                        <div className="grid gap-4 px-20 md:px-4 ">
                            <SignOutButton />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}