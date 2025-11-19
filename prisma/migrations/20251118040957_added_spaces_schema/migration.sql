-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "spacesId" TEXT;

-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "spacesId" TEXT;

-- CreateTable
CREATE TABLE "Spaces" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Spaces_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_spacesId_fkey" FOREIGN KEY ("spacesId") REFERENCES "Spaces"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_spacesId_fkey" FOREIGN KEY ("spacesId") REFERENCES "Spaces"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spaces" ADD CONSTRAINT "Spaces_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
