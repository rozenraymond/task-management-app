import { Button } from '@/components/ui/button';
import { useTaskListStore } from '@/lib/store';
import { Link } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { TaskListTable } from './components/TaskListTable';
import { useDeleteTask, useTasks } from './hooks';

export const TaskListPage = () => {
  const {
    currentPage,
    itemsPerPage,
    searchTerm,
    sortBy,
    sortOrder,
    setCurrentPage,
    setItemsPerPage,
    setSearchTerm,
    setSortBy,
    setSortOrder,
  } = useTaskListStore();

  const { data, isLoading, isError, error } = useTasks({
    page: currentPage,
    searchTerm,
    sortBy,
    sortOrder,
    itemsPerPage,
  });

  const debouncedSearch = useDebouncedCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, 300);

  const { mutateAsync: deleteTask } = useDeleteTask();

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
  };

  const handleSort = (
    newSortBy: 'createdAt' | 'dueDate',
    newSortOrder: 'asc' | 'desc',
  ) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  const totalPages = Math.max(
    Math.ceil((data?.totalCount ?? 0) / itemsPerPage),
    1,
  );

  return (
    <div className="lg:container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Task Management App
      </h1>
      <div className="mb-4">
        <Button asChild>
          <Link to="/add">Add New Task</Link>
        </Button>
      </div>

      <TaskListTable
        tasks={data?.tasks || []}
        onDeleteTask={handleDeleteTask}
        onSearch={debouncedSearch}
        onSort={handleSort}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={data?.totalCount || 0}
        itemsPerPage={itemsPerPage}
        isLoading={isLoading}
        searchTerm={searchTerm}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    </div>
  );
};
