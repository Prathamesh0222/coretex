import { ai } from "@/app/services/ai/Analysis";
import { getCached, hashKey, setCache } from "./cache";

export const EMBEDDING_DIMENSIONS = 1536;
const EMBEDDING_CACHE_TTL = 86400 * 7;

export const generateEmbedding = async (text: string): Promise<number[]> => {
  const textHash = hashKey(text);
  const cacheKey = `embedding:${textHash}`;

  const cached = await getCached<number[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: text,
      config: {
        outputDimensionality: EMBEDDING_DIMENSIONS,
      },
    });

    const embedding = response.embeddings?.[0].values;

    if (!embedding) {
      throw new Error("No embedding returned from API");
    }

    if (embedding.length !== EMBEDDING_DIMENSIONS) {
      throw new Error(
        `Invalid embedding dimensions: got ${embedding.length}, expected ${EMBEDDING_DIMENSIONS}`
      );
    }

    await setCache(cacheKey, embedding, EMBEDDING_CACHE_TTL);

    return embedding;
  } catch (error) {
    console.error("Embedding generation failed:", error);
    throw new Error(
      `Failed to generate embedding: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};
