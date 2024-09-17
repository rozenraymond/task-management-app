import { ITEMS_PER_PAGE, useDeleteTask, useTasks } from "./hooks";
import { TaskListTable } from "./components/TaskListTable";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const TaskListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "dueDate">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data, isLoading, isError, error } = useTasks({
    page: currentPage,
    searchTerm,
    sortBy,
    sortOrder,
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
    newSortBy: "createdAt" | "dueDate",
    newSortOrder: "asc" | "desc"
  ) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  const totalPages = Math.max(
    Math.ceil((data?.totalCount ?? 0) / ITEMS_PER_PAGE),
    1
  );

  return (
    <div className="container mx-auto px-4 py-8">
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
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={data?.totalCount || 0}
        itemsPerPage={ITEMS_PER_PAGE}
        isLoading={isLoading}
      />
    </div>
  );
};
