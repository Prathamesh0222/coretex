-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "embedding" vector(1536);

-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "embedding" vector(1536);
