import * as z from "zod"

export const registerSchema = z.object({
    name: z.string().min(3,{message:"Name must be between 3 and 8"}).max(8,{message:"Name must be between 3 and 8"}),
    email: z.string().nonempty(),
    password: z.string().min(6,{message:"Password must be more than 5"}),
    profileImageUrl: z.string().optional(),

})