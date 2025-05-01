-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_userId_fkey";

-- DropForeignKey
ALTER TABLE "ContentTags" DROP CONSTRAINT "ContentTags_contentId_fkey";

-- DropForeignKey
ALTER TABLE "ContentTags" DROP CONSTRAINT "ContentTags_tagsId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_userId_fkey";

-- DropForeignKey
ALTER TABLE "NotesTags" DROP CONSTRAINT "NotesTags_notesId_fkey";

-- DropForeignKey
ALTER TABLE "NotesTags" DROP CONSTRAINT "NotesTags_tagsId_fkey";

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentTags" ADD CONSTRAINT "ContentTags_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentTags" ADD CONSTRAINT "ContentTags_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotesTags" ADD CONSTRAINT "NotesTags_notesId_fkey" FOREIGN KEY ("notesId") REFERENCES "Notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotesTags" ADD CONSTRAINT "NotesTags_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
