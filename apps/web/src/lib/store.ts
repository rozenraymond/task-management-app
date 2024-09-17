import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TaskListState {
  currentPage: number;
  itemsPerPage: number;
  searchTerm: string;
  sortBy: 'createdAt' | 'dueDate';
  sortOrder: 'asc' | 'desc';
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  setSearchTerm: (term: string) => void;
  setSortBy: (sortBy: 'createdAt' | 'dueDate') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
}

export const useTaskListStore = create<TaskListState>()(
  persist(
    (set) => ({
      currentPage: 1,
      itemsPerPage: 20,
      searchTerm: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      setCurrentPage: (page) => set({ currentPage: page }),
      setItemsPerPage: (items) => set({ itemsPerPage: items }),
      setSearchTerm: (term) => set({ searchTerm: term }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (order) => set({ sortOrder: order }),
    }),
    {
      name: 'task-list-storage',
    },
  ),
);
