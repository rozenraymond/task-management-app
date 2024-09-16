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

export const TaskListTable = ({ tasks }: { tasks?: Task[] }) => {
  if (!tasks) {
    return null;
  }

  if (tasks.length === 0) {
    return <p>No result found</p>;
  }

  const handleDelete = async (id: string) => {
    console.log("Delete task:", id);
  };

  return (
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
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(task.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
