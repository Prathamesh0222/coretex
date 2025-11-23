import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSearchState } from "../store/searchState";
import { Message, SearchResponse, SearchResult } from "@/types/search-type";

export const useSearch = () => {
  const { messages, addMessage, clearMessages } = useSearchState();

  const mutation = useMutation<SearchResult[], Error, SearchResponse>({
    mutationFn: async ({ query, limit = 10 }) => {
      const response = await axios.post("/api/search", { query, limit });
      return response.data.results;
    },
    onSuccess: (data) => {
      const filteredResults = data.filter((result) => result.similarity > 0.5);

      const resultMessage: Message = {
        id: Date.now().toString(),
        type: "results",
        content: `Found ${filteredResults.length} relevant items`,
        results: filteredResults,
        timestamp: new Date().toISOString(),
      };
      addMessage(resultMessage);
    },
    onError: (error) => {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "results",
        content: `Error: ${error.message}`,
        timestamp: new Date().toISOString(),
      };
      addMessage(errorMessage);
    },
  });
  const search = (variables: SearchResponse) => {
    const queryMessage: Message = {
      id: Date.now().toString(),
      type: "query",
      content: variables.query,
      timestamp: new Date().toISOString(),
    };
    addMessage(queryMessage);
    mutation.mutate(variables);
  };

  return {
    messages,
    search,
    clearMessages,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
