import { Content, Notes } from "./content-type";

export interface Space {
  id: string;
  name: string;
  description: string | null;
  userId: string;
  createdAt: string;
  content?: Content[];
  notes?: Notes[];
}

export interface CreateSpaceData {
  name: string;
  description: string;
}

export interface AddToSpaceData {
  spaceId: string;
  contentIds?: string[];
  notesIds?: string[];
}

export interface RemoveFromSpaceData {
  contentId?: string;
  notesId?: string;
}
