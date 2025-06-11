import { create } from 'zustand';

interface TopicState {
  topics: string[];
  setTopics: (topics: string[]) => void;
  addTopic: (id: string) => void;
  clearTopics: () => void;
  deleteTopic: (id: string) => void;
}

export const useTopicStore = create<TopicState>((set, get) => ({
  topics: [],
  setTopics: (topics) => set({ topics }), 
  addTopic: (id) => {
    const arr = get().topics
    if(arr.includes(id)) return;   
    set((state) => ({ topics: [ ...state.topics,id] }))
  },
  deleteTopic: (id) => 
    set((state) => ({
      topics: state.topics.filter((topic) => topic !== id)
  })),
  clearTopics: () => set({ topics: [] }), 
}));
