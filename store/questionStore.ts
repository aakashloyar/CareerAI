import { create } from 'zustand';
import { queOptType } from '@/lib/validation';
interface QuestionState {
  questions: queOptType[];
  setQuestions: (questions: queOptType[]) => void;
  addQuestion: (question: queOptType) => void;
  clearQuestions: () => void;
  deleteQuestion: (id: string) => void;
}
export const useQuestionStore = create<QuestionState>((set) => ({
  questions: [],
  setQuestions: (questions) => set({ questions }), 
  addQuestion: (question) => {
    set((state) => ({ questions: [...state.questions, question] }));
  },
  deleteQuestion: (id) => 
    set((state) => ({
      questions: state.questions.filter((question) => question.id !== id)
    })),
  clearQuestions: () => set({ questions: [] }), 
}));
