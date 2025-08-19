
import { z } from 'zod'

export const registerUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Length must be atleast 6")
})
