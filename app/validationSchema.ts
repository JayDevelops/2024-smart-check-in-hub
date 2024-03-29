import {z} from "zod"

export const guestSchema = z.object({
    firstName: z.string().min(1, "First Name is Required").max(255),
    lastName: z.string().min(1, "Last Name is Required").max(255),
    notes: z.string().optional(),
    signedIn: z.date().optional(),
    signedOut: z.date().optional(),
    status: z.enum(["CHECKED_IN", "ON_PREMISES", "CHECKED_OUT"]),
    locationId: z.number().positive("Location ID must be positive"),
})