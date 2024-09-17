import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as router from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { EditTaskPage } from './EditTaskPage';
import * as hooks from './hooks';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to}>{children}</a>
    ),
  };
});

vi.mock('./hooks', () => ({
  useTask: vi.fn(),
  useUpdateTask: vi.fn(),
}));

describe('EditTaskPage', () => {
  const mockNavigate = vi.fn();
  const mockUpdateTask = vi.fn();

  beforeEach(() => {
    vi.spyOn(router, 'useParams').mockReturnValue({ id: '123' });
    vi.spyOn(router, 'useNavigate').mockReturnValue(mockNavigate);
    vi.spyOn(hooks, 'useUpdateTask').mockReturnValue({
      mutateAsync: mockUpdateTask,
      isPending: false,
    } as unknown as ReturnType<typeof hooks.useUpdateTask>);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading state', () => {
    vi.spyOn(hooks, 'useTask').mockReturnValue({
      isLoading: true,
      data: undefined,
    } as unknown as ReturnType<typeof hooks.useTask>);

    render(<EditTaskPage />);

    expect(screen.getByLabelText('spinner')).toBeDefined();
  });

  it('renders edit task form when data is loaded', async () => {
    const mockTaskData = {
      id: '123',
      name: 'Test Task',
      description: 'Test Description',
      dueDate: '2024-09-17T23:59:59.999Z',
    };

    vi.spyOn(hooks, 'useTask').mockReturnValue({
      data: mockTaskData,
      isLoading: false,
    } as unknown as ReturnType<typeof hooks.useTask>);

    render(<EditTaskPage />);

    expect(screen.getByText('Edit task')).toBeDefined();
    expect(await screen.findByLabelText('Task name')).toBeDefined();
    expect(screen.getByLabelText('Description')).toBeDefined();
    expect(screen.getByLabelText('Due date')).toBeDefined();
  });

  it('navigates back when clicking the back button', () => {
    const mockTaskData = {
      id: '123',
      name: 'Test Task',
      description: 'Test Description',
      dueDate: '2024-09-17T23:59:59.999Z',
    };

    vi.spyOn(hooks, 'useTask').mockReturnValue({
      data: mockTaskData,
      isLoading: false,
    } as unknown as ReturnType<typeof hooks.useTask>);

    render(<EditTaskPage />);

    fireEvent.click(screen.getByText('Back'));

    expect(screen.getByText('Back').closest('a')).toHaveAttribute('href', '/');
  });

  it('calls updateTask and navigates on form submission', async () => {
    const mockTaskData = {
      id: '123',
      name: 'Test Task',
      description: 'Test Description',
      dueDate: '2024-09-17T23:59:59.999Z',
    };

    vi.spyOn(hooks, 'useTask').mockReturnValue({
      data: mockTaskData,
      isLoading: false,
    } as unknown as ReturnType<typeof hooks.useTask>);

    render(<EditTaskPage />);

    fireEvent.change(screen.getByLabelText('Task name'), {
      target: { value: 'Updated Task' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Updated Description' },
    });

    fireEvent.click(screen.getByLabelText('Due date'));
    fireEvent.click(screen.getByText('17'));

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockUpdateTask).toHaveBeenCalledWith({
        id: '123',
        name: 'Updated Task',
        description: 'Updated Description',
        dueDate: expect.any(String),
      });
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('is able to submit the form successfully', async () => {
    const mockTaskData = {
      id: '123',
      name: 'Test Task',
      description: 'Test Description',
      dueDate: '2024-09-17T23:59:59.999Z',
    };

    vi.spyOn(hooks, 'useTask').mockReturnValue({
      data: mockTaskData,
      isLoading: false,
    } as unknown as ReturnType<typeof hooks.useTask>);

    const mockUpdateTaskFn = vi.fn().mockResolvedValue({ success: true });

    vi.spyOn(hooks, 'useUpdateTask').mockReturnValue({
      mutateAsync: mockUpdateTaskFn,
      isPending: false,
    } as unknown as ReturnType<typeof hooks.useUpdateTask>);

    render(<EditTaskPage />);

    fireEvent.change(screen.getByLabelText('Task name'), {
      target: { value: 'Updated Task' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Updated Description' },
    });

    fireEvent.click(screen.getByLabelText('Due date'));
    fireEvent.click(screen.getByText('17'));

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockUpdateTaskFn).toHaveBeenCalledWith({
        id: '123',
        name: 'Updated Task',
        description: 'Updated Description',
        dueDate: expect.any(String),
      });
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');

    expect(screen.queryByText('Submitting...')).toBeNull();
    expect(screen.getByText('Submit')).toBeDefined();
  });
});
