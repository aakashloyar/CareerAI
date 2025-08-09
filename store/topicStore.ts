import { create } from 'zustand';
type Topic={
  value:string
}
interface TopicState {
  topics: Topic[];
  setTopics: (topics: Topic[]) => void;
  addTopic: (id: string) => void;
  clearTopics: () => void;
  deleteTopic: (id: string) => void;
}

export const useTopicStore = create<TopicState>((set, get) => ({
  topics: [],
  setTopics: (topics) => set({ topics }), 
  addTopic: (id) => {
    const arr = get().topics
    for(let i=0;i<arr.length;i++) {
      if(arr[i].value==id) return;
    }   
    set((state) => ({ topics: [ ...state.topics,{value:id}] }))
  },
  deleteTopic: (id) => 
    set((state) => ({
      topics: state.topics.filter((topic) => topic.value !== id)
  })),
  clearTopics: () => set({ topics: [] }), 
}));
