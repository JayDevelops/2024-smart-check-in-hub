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
import { Input } from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import DateTimePicker from "@/app/guests/new-guest/DateTimePicker";

export function GuestForm() {
    // Define the Guest Form validation with zod resolvers
    const form = useForm<z.infer<typeof guestSchema>>( {
        resolver: zodResolver(guestSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            notes: "",
            checkedInAt: new Date(),
            checkedOutAt: undefined,
            guestStatus: "CHECKED_IN",
            locationId: undefined,
        }
    })

    // Define a submit handler.
    function onSubmit(values: z.infer<typeof guestSchema>) {
        // This will be type-safe and validated.
        console.log(values)
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
                    name="checkedInAt"
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
                                        onChange={(date) => field.onChange(date.toISOString())}
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

