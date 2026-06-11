import { create } from 'zustand';

export interface Task {
  id: string;
  description: string;
}

interface TaskStore {
  tasks: Task[];
  addTask: (description: string) => void;
  removeTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (description) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: Date.now().toString(), description },
      ],
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));
