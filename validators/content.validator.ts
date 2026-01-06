import { z } from "zod";
import { ContentType } from "../store/contentState";

export const ContentSchema = z.object({
  title: z.string(),
  type: z.nativeEnum(ContentType, {
    message: `Type must be one of ${Object.values(ContentType).join(", ")}`,
  }),
  description: z.string().optional(),
  summary: z.string().optional(),
  link: z.string().optional(),
  tags: z.array(z.string()),
});

export type ContentInput = z.infer<typeof ContentSchema>;
