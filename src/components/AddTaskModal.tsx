import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (text: string) => void;
};

// TODO refactor it

export const AddTaskModal = ({ isOpen, onClose, onAdd }: Props) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black/30 z-50'
      aria-modal='true'
      role='dialog'
    >
      <div
        className='bg-white dark:bg-gray-800 rounded-lg p-6 w-80'
        role='document'
      >
        <h2 className='text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100'>
          Add New Task
        </h2>
        <input
          ref={inputRef}
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='border rounded p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          placeholder='Task description'
        />
        <div className='flex justify-end gap-2'>
          <Button variant='secondary' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add</Button>
        </div>
      </div>
    </div>
  );
};
