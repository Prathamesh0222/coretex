import { ai } from "./Analysis";
import { SearchResult } from "@/types/search-type";

interface RankingScore {
  index: number;
  score: number;
}

export async function rerankResults(
  query: string,
  results: SearchResult[]
): Promise<SearchResult[]> {
  if (results.length === 0) {
    return [];
  }

  const itemsToRank = results
    .map((result, index) => {
      const isNote = result.resultType === "notes";
      const description = isNote
        ? result.description?.substring(0, 200)
        : result.summary;
      const tags = result.tags.map((tag) => tag.title).join(", ");

      return `${index}. Title: ${result.title}
   Type: ${isNote ? "Note" : result.type}
   Content: ${description || "No description"}
   Tags: ${tags || "None"}`;
    })
    .join("\n\n");

  const prompt = `You are a semantic search ranker. Score each item's relevance to the user's query.

User Query: "${query}"

Items to rank:
${itemsToRank}

Return ONLY a JSON array with relevance scores (0-100):
[{"index": 0, "score": 85}, {"index": 1, "score": 45}]

Score based on direct relevance, context match, and intent alignment.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const text = response.text;
    if (!text) {
      console.warn("No AI response, returning original results");
      return addDefaultAiScores(results);
    }

    const cleanedText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const rankings: RankingScore[] = JSON.parse(cleanedText);

    const rerankedResults = rankings.map((ranking) => {
      const result = results[ranking.index];
      const aiScore = ranking.score / 100;

      return {
        ...result,
        aiScore,
      };
    });

    const sortedResults = rerankedResults.sort((a, b) => b.aiScore - a.aiScore);

    return sortedResults;
  } catch (error) {
    console.error("AI reranking failed:", error);
    return addDefaultAiScores(results);
  }
}

function addDefaultAiScores(results: SearchResult[]) {
  return results.map((result) => ({
    ...result,
    aiScore: result.similarity,
  }));
}
