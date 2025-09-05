import * as z from "zod"

export const loginSchema = z.object ({
    email:z.string().nonempty(),
    password: z.string().min(6,{message:"Password must be more than 5"}),
    
})