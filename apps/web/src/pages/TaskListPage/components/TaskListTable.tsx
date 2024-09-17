import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Task } from '@task-management-platform/validation';
import {
  addDays,
  endOfDay,
  format,
  isBefore,
  isWithinInterval,
} from 'date-fns';
import { ArrowDownIcon, ArrowUpIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { DeleteTaskConfirmationModal } from './DeleteTaskConfirmationModal';
import { StatusBadge } from './StatusBadge';

interface TaskListTableProps {
  tasks?: Task[];
  onDeleteTask?: (id: string) => Promise<void>;
  onSearch: (searchTerm: string) => void;
  onSort: (sortBy: 'createdAt' | 'dueDate', sortOrder: 'asc' | 'desc') => void;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  isLoading?: boolean;
  searchTerm: string;
  sortBy: 'createdAt' | 'dueDate';
  sortOrder: 'asc' | 'desc';
}

export const TaskListTable = ({
  tasks = [],
  onDeleteTask,
  onSearch,
  onSort,
  onPageChange,
  onItemsPerPageChange,
  currentPage,
  totalPages,
  itemsPerPage,
  isLoading,
  searchTerm,
  sortBy,
  sortOrder,
  totalItems,
}: TaskListTableProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [internalSearchTerm, setInternalSearchTerm] = useState(searchTerm);

  const handleOpenDeleteModal = useCallback((task: Task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (selectedTask && onDeleteTask) {
      await onDeleteTask(selectedTask.id);
      setIsDeleteModalOpen(false);
      setSelectedTask(null);
    }
  }, [selectedTask, onDeleteTask]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
      setInternalSearchTerm(e.target.value);
    },
    [onSearch],
  );

  const handleClearSearch = useCallback(() => {
    onSearch('');
    setInternalSearchTerm('');
  }, []);

  const handleSort = useCallback(
    (newSortBy: 'createdAt' | 'dueDate', newSortOrder: 'asc' | 'desc') => {
      onSort(newSortBy, newSortOrder);
    },
    [onSort],
  );

  const handleItemsPerPageChange = useCallback(
    (value: string) => {
      onItemsPerPageChange(Number(value));
    },
    [onItemsPerPageChange],
  );

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative max-w-sm">
          <Input
            placeholder="Search tasks..."
            onChange={handleSearch}
            value={internalSearchTerm}
            className="pr-10"
          />
          {internalSearchTerm && (
            <XIcon
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black"
              size={18}
              onClick={handleClearSearch}
            />
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span>Items per page:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table aria-label="List of tasks">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>
                <SortableHeaderButton
                  title="Due Date"
                  sortState={sortBy === 'dueDate' ? sortOrder : 'none'}
                  onSortAesc={() => {
                    handleSort('dueDate', 'asc');
                  }}
                  onSortDesc={() => {
                    handleSort('dueDate', 'desc');
                  }}
                />
              </TableHead>
              <TableHead>
                <SortableHeaderButton
                  title="Created At"
                  sortState={sortBy === 'createdAt' ? sortOrder : 'none'}
                  onSortAesc={() => {
                    handleSort('createdAt', 'asc');
                  }}
                  onSortDesc={() => {
                    handleSort('createdAt', 'desc');
                  }}
                />
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
                    {format(new Date(task.dueDate), 'do MMM yyyy')}
                  </TableCell>
                  <TableCell>
                    {format(new Date(task.createdAt), 'do MMM yyyy')}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-center">
                    <StatusBadge
                      status={getTaskStatus(new Date(task.dueDate))}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      <Button size="sm" variant="link" asChild className="mr-2">
                        <Link to={`/edit/${task.id}`}>Edit</Link>
                      </Button>
                      {!!onDeleteTask && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDeleteModal(task)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span>
          Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{' '}
          items
        </span>
        <div className="flex gap-4 items-center">
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
    return 'Overdue';
  }

  const sevenDaysFromNow = addDays(today, 7);

  if (isWithinInterval(dueDate, { start: today, end: sevenDaysFromNow })) {
    return 'Due soon';
  }

  return 'Not Urgent';
};

export const SortableHeaderButton = ({
  title,
  sortState,
  onSortAesc,
  onSortDesc,
}: {
  title: string;
  onSortDesc: () => void;
  onSortAesc: () => void;
  sortState: 'asc' | 'desc' | 'none';
}) => {
  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {sortState === 'desc' ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : sortState === 'asc' ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={onSortAesc}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onSortDesc}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
