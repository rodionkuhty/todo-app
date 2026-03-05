import { ModeToggle } from '@/components/mode-toggle.tsx';
import Search from '@/components/Search.tsx';
import Settings from '@/components/Settings';

export function UsersAria() {
  return (
    <div className='flex items-center bg-background text-foreground'>
      <div className='mr-1.5'>
        <Search withKbd />
      </div>
      <ModeToggle />
      <div className='ml-1.5'>
        <Settings />
      </div>
    </div>
  );
}
