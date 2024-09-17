import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@task-management-platform/validation";
import {
  addDays,
  endOfDay,
  format,
  isBefore,
  isWithinInterval,
} from "date-fns";
import { Link } from "react-router-dom";
import { DeleteTaskConfirmationModal } from "./DeleteTaskConfirmationModal";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TaskListTableProps {
  tasks?: Task[];
  onDeleteTask?: (id: string) => Promise<void>;
  onSearch: (searchTerm: string) => void;
  onSort: (sortBy: "createdAt" | "dueDate", sortOrder: "asc" | "desc") => void;
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  isLoading?: boolean;
}

export const TaskListTable = ({
  tasks,
  onDeleteTask,
  onSearch,
  onSort,
  onPageChange,
  currentPage,
  totalPages,
  isLoading,
}: TaskListTableProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sortBy, setSortBy] = useState<"createdAt" | "dueDate">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleOpenDeleteModal = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedTask && onDeleteTask) {
      await onDeleteTask(selectedTask.id);
      setIsDeleteModalOpen(false);
      setSelectedTask(null);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleSort = (newSortBy: "createdAt" | "dueDate") => {
    const newSortOrder =
      sortBy === newSortBy ? (sortOrder === "asc" ? "desc" : "asc") : "asc";
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    onSort(newSortBy, newSortOrder);
  };

  const renderSortIcon = (column: "createdAt" | "dueDate") => {
    if (sortBy === column) {
      return sortOrder === "asc" ? (
        <ChevronUp className="ml-1 h-5 w-5 self-center" />
      ) : (
        <ChevronDown className="ml-1 h-5 w-5 self-center" />
      );
    }
    return null;
  };

  return (
    <>
      <div className="mb-4">
        <Input placeholder="Search tasks..." onChange={handleSearch} />
      </div>
      <div className="rounded-md border">
        <Table aria-label="List of tasks">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead onClick={() => handleSort("dueDate")}>
                Due Date {renderSortIcon("dueDate")}
              </TableHead>
              <TableHead onClick={() => handleSort("createdAt")}>
                Create Date {renderSortIcon("createdAt")}
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading || !tasks ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No tasks found
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    {format(new Date(task.dueDate), "do MMM yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(task.createdAt), "do MMM yyyy")}
                  </TableCell>
                  <TableCell>{getTaskStatus(new Date(task.dueDate))}</TableCell>
                  <TableCell>
                    <Button asChild className="mr-2">
                      <Link to={`/edit/${task.id}`}>Edit</Link>
                    </Button>
                    {!!onDeleteTask && (
                      <Button
                        variant="destructive"
                        onClick={() => handleOpenDeleteModal(task)}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-end gap-4 items-center">
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
        >
          Next
        </Button>
      </div>

      <DeleteTaskConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        taskName={selectedTask?.name}
      />
    </>
  );
};

const getTaskStatus = (dueDate: Date) => {
  const today = endOfDay(new Date());

  if (isBefore(dueDate, today)) {
    return "Overdue";
  }

  const sevenDaysFromNow = addDays(today, 7);

  if (isWithinInterval(dueDate, { start: today, end: sevenDaysFromNow })) {
    return "Due soon";
  }

  return "Not Urgent";
};
