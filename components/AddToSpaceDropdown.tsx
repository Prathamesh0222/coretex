import { Folder, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useSpaces, useAddToSpace, useRemoveFromSpace } from "@/hooks/useSpace";
import { Button } from "@/components/ui/button";

interface AddToSpaceDropdownProps {
  contentId?: string;
  notesId?: string;
  currentSpaceId?: string | null;
  isViewingSpace?: boolean;
  viewingSpaceId?: string | null;
}

export const AddToSpaceDropdown = ({
  contentId,
  notesId,
  currentSpaceId,
  isViewingSpace = false,
  viewingSpaceId = null,
}: AddToSpaceDropdownProps) => {
  const { data: spaces, isLoading } = useSpaces();
  const addToSpaceMutation = useAddToSpace();
  const removeFromSpaceMutation = useRemoveFromSpace();

  const handleAddToSpace = (spaceId: string) => {
    addToSpaceMutation.mutate({
      spaceId,
      contentIds: contentId ? [contentId] : [],
      notesIds: notesId ? [notesId] : [],
    });
  };

  const handleRemoveFromSpace = () => {
    removeFromSpaceMutation.mutate({
      contentId,
      notesId,
    });
  };

  const isInSpace = currentSpaceId !== null && currentSpaceId !== undefined;
  const isInCurrentSpace = isViewingSpace && currentSpaceId === viewingSpaceId;
  const isPending =
    addToSpaceMutation.isPending || removeFromSpaceMutation.isPending;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 cursor-pointer"
          disabled={isPending}
        >
          <MoreVertical className="h-4 w-4 hover:text-blue-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card">
        {isInCurrentSpace ? (
          <>
            <DropdownMenuLabel>Manage Space</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleRemoveFromSpace}
              disabled={isPending}
              className="text-red-600 focus:text-red-600"
            >
              Remove from Space
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Move to Space</DropdownMenuLabel>
            {isLoading ? (
              <DropdownMenuItem disabled>Loading spaces...</DropdownMenuItem>
            ) : spaces && spaces.length > 0 ? (
              spaces
                .filter((space) => space.id !== currentSpaceId)
                .map((space) => (
                  <DropdownMenuItem
                    key={space.id}
                    onClick={() => handleAddToSpace(space.id)}
                    disabled={isPending}
                  >
                    {space.name}
                  </DropdownMenuItem>
                ))
            ) : (
              <DropdownMenuItem disabled>No other spaces</DropdownMenuItem>
            )}
          </>
        ) : (
          <>
            <DropdownMenuLabel className="flex items-center gap-2">
              {isInSpace ? (
                <>
                  <Folder className="w-4 h-4 text-green-500" />
                  Move to Space
                </>
              ) : (
                <>
                  <Folder className="w-4 h-4 text-blue-500" />
                  Add to Space
                </>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isLoading ? (
              <DropdownMenuItem disabled>Loading spaces...</DropdownMenuItem>
            ) : spaces && spaces.length > 0 ? (
              spaces
                .filter((space) => space.id !== currentSpaceId)
                .map((space) => (
                  <DropdownMenuItem
                    key={space.id}
                    onClick={() => handleAddToSpace(space.id)}
                    disabled={isPending}
                    className="cursor-pointer"
                  >
                    {space.name}
                  </DropdownMenuItem>
                ))
            ) : (
              <DropdownMenuItem disabled>No spaces available</DropdownMenuItem>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
