import {z} from "zod"

export const guestSchema = z.object({
    firstName: z.string().min(1, "First Name is Required").max(255),
    lastName: z.string().min(1, "Last Name is Required").max(255),
    notes: z.string().optional(),
    checkedInAt: z.date().optional(),
    checkedOutAt: z.date().optional(),
    guestStatus: z.enum(["CHECKED_IN", "ON_PREMISES", "CHECKED_OUT"]),
    locationId: z.number().positive("Location ID must be positive"),
})