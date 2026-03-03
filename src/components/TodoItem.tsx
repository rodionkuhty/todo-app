import type { Task } from '@/lib/types';
import { CheckCircle, GripVertical, X } from 'lucide-react';

type Props = {
  task: Task;
  onToggle: (id: number) => void;
  onReorder: (draggedId: number, targetId: number) => void;
};

// TODO refactor it

export const TodoItem = ({ task, onToggle, onReorder }: Props) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id.toString());
  };

  const handleDrop = (e: React.DragEvent) => {
    const draggedId = Number(e.dataTransfer.getData('text/plain'));
    if (draggedId !== task.id) onReorder(draggedId, task.id);
  };

  return (
    <div
      className='group rounded-xl shadow-md p-4 bg-white dark:bg-gray-800 transition-transform duration-200 hover:scale-105 cursor-pointer'
      draggable
      onDragStart={handleDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      role='button'
      tabIndex={0}
      aria-grabbed={false}
    >
      <div className='flex items-center gap-3'>
        <button
          className='text-lg focus:outline-none'
          onClick={() => onToggle(task.id)}
          aria-checked={task.completed}
          role='checkbox'
          aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.completed ? <X /> : <CheckCircle />}
        </button>

        <p
          className={`flex-1 text-lg ${
            task.completed
              ? 'text-gray-500 line-through'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-green-400'
          }`}
        >
          {task.text}
        </p>

        <GripVertical className='text-gray-400 group-hover:text-gray-600' />
      </div>
    </div>
  );
};
