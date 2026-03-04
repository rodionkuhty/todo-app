import { ModeToggle } from '@/components/mode-toggle.tsx';
import Search from '@/components/Search.tsx';

export function UsersAria() {
  return (
    <div className='flex items-center bg-background text-foreground'>
      <div className='mr-1.5'>
        <Search withKbd />
      </div>
      <ModeToggle />
    </div>
  );
}
