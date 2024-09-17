import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TaskListPage } from "./TaskListPage";
import * as hooks from "./hooks";
import * as store from "@/lib/store";

// Mock the dependencies
vi.mock("./hooks", () => ({
  useTasks: vi.fn(),
  useDeleteTask: vi.fn(),
}));

vi.mock("@/lib/store", () => ({
  useTaskListStore: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

vi.mock("./components/TaskListTable", () => ({
  TaskListTable: () => <div data-testid="task-list-table">Task List Table</div>,
}));

describe("TaskListPage", () => {
  beforeEach(() => {
    vi.spyOn(hooks, "useTasks").mockReturnValue({
      data: {
        tasks: [],
        totalCount: 0,
      },
      isLoading: false,
      isError: false,
      error: null,
    });

    vi.spyOn(hooks, "useDeleteTask").mockReturnValue({
      mutateAsync: vi.fn(),
    });

    vi.spyOn(store, "useTaskListStore").mockReturnValue({
      currentPage: 1,
      itemsPerPage: 10,
      searchTerm: "",
      sortBy: "createdAt",
      sortOrder: "desc",
      setCurrentPage: vi.fn(),
      setItemsPerPage: vi.fn(),
      setSearchTerm: vi.fn(),
      setSortBy: vi.fn(),
      setSortOrder: vi.fn(),
    });
  });

  it("renders the TaskListPage component", () => {
    render(<TaskListPage />);

    expect(screen.getByText("Task Management App")).toBeDefined();
    expect(screen.getByText("Add New Task")).toBeDefined();
    expect(screen.getByTestId("task-list-table")).toBeDefined();
  });

  it("displays error message when there is an error", () => {
    vi.spyOn(hooks, "useTasks").mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: new Error("Test error"),
    });

    render(<TaskListPage />);

    expect(screen.getByText("Error: Test error")).toBeDefined();
  });

  it('navigates to add task page when "Add New Task" is clicked', () => {
    render(<TaskListPage />);

    const addNewTaskLink = screen.getByText("Add New Task");
    expect(addNewTaskLink.closest("a")).toHaveAttribute("href", "/add");
  });
});
