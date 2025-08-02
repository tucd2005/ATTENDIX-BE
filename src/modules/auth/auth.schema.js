

export const registerSchema = z.object({
    email: z.string().min(1, "email is required")
}) 