"use client"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {guestSchema} from "@/app/validationSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import DateTimePicker from "@/app/guests/new-guest/DateTimePicker";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {Textarea} from "@/components/ui/textarea";
import {format} from "date-fns";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation"

export function GuestForm() {
    const router = useRouter()

    // Define the Guest Form validation with zod resolvers
    const form = useForm<z.infer<typeof guestSchema>>({
        resolver: zodResolver(guestSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            notes: "",
            signedIn: new Date(),
            signedOut: undefined,
            status: "CHECKED_IN",
            locationId: undefined,
        }
    })

    // Define a submit handler.
    async function onSubmit(data: z.infer<typeof guestSchema>) {
        // This will be type-safe and validated.
        try {
            toast({
                title: "You submitted the following values:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                     </pre>
                ),
            })
            await axios.post("/api/guests", data)
            router.push("/guests")
            router.refresh()
            console.log(data)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Jay" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the guest&apos;s first name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Perez" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the guest&apos;s last name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Guest Notes</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Write up any notes you have about the particular guest, they will be saved."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Notes are optional, not required.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="signedIn"
                    render={({field}) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Checked In At</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Click for Date and Time</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>

                                <PopoverContent className="w-auto p-2" align="start">
                                    <DateTimePicker
                                        value={field.value ? new Date(field.value): null}
                                        onChange={(date) => field.onChange(date)}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Enter the date and time the guest checked in.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit New Guest</Button>
            </form>
        </Form>
    )
}

