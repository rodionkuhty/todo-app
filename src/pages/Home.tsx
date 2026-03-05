import { useCallback, useMemo, useState } from 'react';
import type { Task } from '@/lib/types';
import { TodoItem } from '@/components/TodoItem';
import { AddTaskModal } from '@/components/AddTaskModal';
import { Button } from '@/components/ui/button';

const demoTasks: Task[] = [
  { id: 1, text: 'Buy groceries', completed: false },
  { id: 2, text: 'Finish report', completed: true },
  { id: 3, text: 'Call Mom', completed: false },
];

function useTasks(initialTasks: Task[]) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = useCallback((id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const reorderTasks = useCallback((draggedId: number, targetId: number) => {
    if (draggedId === targetId) return;

    setTasks((prev) => {
      const draggedIndex = prev.findIndex((t) => t.id === draggedId);
      const targetIndex = prev.findIndex((t) => t.id === targetId);
      if (draggedIndex === -1 || targetIndex === -1) return prev;

      const updated = [...prev];
      const [dragged] = updated.splice(draggedIndex, 1);
      updated.splice(targetIndex, 0, dragged);
      return updated;
    });
  }, []);

  const addTask = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  }, []);

  return { tasks, toggleTask, reorderTasks, addTask };
}

export function Home() {
  const { tasks, toggleTask, reorderTasks, addTask } = useTasks(demoTasks);
  const [isModalOpen, setModalOpen] = useState(false);

  const taskItems = useMemo(
    () =>
      tasks.map((t) => (
        <TodoItem
          key={t.id}
          task={t}
          onToggle={toggleTask}
          onReorder={reorderTasks}
        />
      )),
    [tasks, toggleTask, reorderTasks],
  );

  return (
    <div className='flex flex-col items-center justify-center min-h-full space-y-8 animate-fadeIn'>
      <h1 className='text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100'>
        Welcome to Todo App
      </h1>

      <div className='w-full max-w-md space-y-4'>{taskItems}</div>

      <Button onClick={() => setModalOpen(true)}>Add new task</Button>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={addTask}
      />
    </div>
  );
}

export default Home;
