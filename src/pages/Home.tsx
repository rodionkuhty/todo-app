import { useState } from 'react';
import type { Task } from '@/lib/types';
import { TodoItem } from '@/components/TodoItem';
import { AddTaskModal } from '@/components/AddTaskModal';
import { Button } from '@/components/ui/button';

const demoTasks: Task[] = [
  { id: 1, text: 'Buy groceries', completed: false },
  { id: 2, text: 'Finish report', completed: true },
  { id: 3, text: 'Call Mom', completed: false },
];

// TODO refactor it
export function Home() {
  const [tasks, setTasks] = useState<Task[]>(demoTasks);
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const reorderTasks = (draggedId: number, targetId: number) => {
    const draggedIndex = tasks.findIndex((t) => t.id === draggedId);
    const targetIndex = tasks.findIndex((t) => t.id === targetId);
    if (draggedIndex === -1 || targetIndex === -1) return;
    const updated = [...tasks];
    const [dragged] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, dragged);
    setTasks(updated);
  };

  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now(), text, completed: false };
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-full space-y-8 animate-fadeIn'>
      <h1 className='text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100'>
        Welcome to Todo App
      </h1>
      <div className='w-full max-w-md space-y-4'>
        {tasks.map((t) => (
          <TodoItem
            key={t.id}
            task={t}
            onToggle={toggleTask}
            onReorder={reorderTasks}
          />
        ))}
      </div>
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
