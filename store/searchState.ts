import { Message, SearchResult } from "@/types/search-type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchState {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

export const useSearchState = create<SearchState>()(
  persist(
    (set) => ({
      messages: [],
      setMessages: (messages) => set({ messages }),
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      clearMessages: () =>
        set({
          messages: [],
        }),
    }),
    {
      name: "search-messages-storage",
    }
  )
);
