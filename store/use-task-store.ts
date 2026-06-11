import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Task {
  id: string;
  description: string;
}

interface TaskStore {
  tasks: Task[];
  addTask: (description: string) => void;
  removeTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (description) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: Date.now().toString() + Math.random().toString(36).slice(2, 8), description },
          ],
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),
    {
      name: 'task-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
