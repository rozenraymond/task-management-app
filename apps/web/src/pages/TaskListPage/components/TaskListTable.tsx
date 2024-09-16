import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@task-management-platform/validation";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { DeleteTaskConfirmationModal } from "./DeleteTaskConfirmationModal";
import { useState } from "react";

interface TaskListTableProps {
  tasks?: Task[];
  onDeleteTask?: (id: string) => Promise<void>;
}

export const TaskListTable = ({ tasks, onDeleteTask }: TaskListTableProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  if (!tasks) {
    return null;
  }

  if (tasks.length === 0) {
    return <p>No result found</p>;
  }

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

  return (
    <>
      <Table aria-label="List of tasks">
        <TableCaption>List of tasks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.map((task) => {
            return (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{format(task.dueDate, "do MMM yyyy")}</TableCell>
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
            );
          })}
        </TableBody>
      </Table>
      <DeleteTaskConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        taskName={selectedTask?.name}
      />
    </>
  );
};
