import { z } from "zod";

export const userSchema = z.object({
    username: z.string().min(3, "Username should be 3-10 letters"),
    password: z.string().min(8, "Password should be 9-20 characters")
        .max(20, "Password should be 9-20 chracters")
})

const contentTypes = ["images", "video", "audio", "article"] as const;

export const contentSchema = z.object({
    link: z.string().url({ message: "Must be a valid URL." }),
    type: z.enum(contentTypes, { message: `Type must be one of: ${contentTypes.join(", ")}` }),
    title: z.string().min(1, { message: "Title is required. " }),
    tags: z.array(z.string()).optional(),
})