import { z } from "zod";

export const AddToSpaceSchema = z.object({
  spaceId: z.string().uuid("Space ID must be a valid UUID"),
  contentIds: z.array(z.string().uuid("Content ID must be a valid UUID")),
  notesIds: z.array(z.string().uuid("Notes ID must be a valid UUID")),
});
