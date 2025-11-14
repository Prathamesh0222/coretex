-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "embedding" vector(1536);

-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "embedding" vector(1536);
