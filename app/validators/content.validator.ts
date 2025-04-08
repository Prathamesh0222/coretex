import { z } from "zod";

const ContentType = ["YOUTUBE", "TWITTER", "SPOTIFY"] as const;

export const ContentSchema = z.object({
  title: z.string(),
  type: z.enum(ContentType, {
    message: `Type must be one of ${ContentType.join(", ")}`,
  }),
  link: z.string().url({ message: "Must be a valid URL" }),
  tags: z.array(z.string()),
});

export type ContentInput = z.infer<typeof ContentSchema>;
