import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AddTaskPage } from "./AddTaskPage";
import * as hooks from "./hooks";
import * as reactRouter from "react-router-dom";

vi.mock("./hooks", () => ({
  useCreateTask: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  Link: ({ children, to }: any) => <a href={to}>{children}</a>,
  useNavigate: vi.fn(),
}));

vi.mock("@/components/TaskForm", () => ({
  TaskForm: ({ onSubmit, isSubmitting }: any) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          name: "Test Task",
          description: "Test Description",
          dueDate: new Date(),
        });
      }}
    >
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  ),
}));

describe("AddTaskPage", () => {
  const mockNavigate = vi.fn();
  const mockCreateTask = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(reactRouter, "useNavigate").mockReturnValue(mockNavigate);
    vi.spyOn(hooks, "useCreateTask").mockReturnValue({
      mutateAsync: mockCreateTask,
      isPending: false,
    } as unknown as ReturnType<typeof hooks.useCreateTask>);
  });

  it("renders the AddTaskPage component", () => {
    render(<AddTaskPage />);

    expect(screen.getByText("Add new task")).toBeDefined();
    expect(screen.getByText("Back")).toBeDefined();
    expect(screen.getByRole("button", { name: "Submit" })).toBeDefined();
  });

  it("navigates back when clicking the back button", () => {
    render(<AddTaskPage />);

    const backButton = screen.getByText("Back");
    expect(backButton.closest("a")).toHaveAttribute("href", "/");
  });

  it("submits the form and navigates on success", async () => {
    render(<AddTaskPage />);

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCreateTask).toHaveBeenCalledWith({
        name: "Test Task",
        description: "Test Description",
        dueDate: expect.any(String),
      });
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("displays loading state when submitting", async () => {
    vi.spyOn(hooks, "useCreateTask").mockReturnValue({
      mutateAsync: vi
        .fn()
        .mockImplementation(
          () => new Promise((resolve) => setTimeout(resolve, 1000))
        ),
      isPending: true,
    } as unknown as ReturnType<typeof hooks.useCreateTask>);

    render(<AddTaskPage />);

    expect(screen.getByRole("button", { name: "Submitting..." })).toBeDefined();
  });
});
