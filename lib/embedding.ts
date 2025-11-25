import { ai } from "@/app/services/ai/Analysis";

export const EMBEDDING_DIMENSIONS = 1536;

export const generateEmbedding = async (text: string) => {
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
