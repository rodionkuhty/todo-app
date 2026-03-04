import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { ArrowRightIcon, LucideCircleCheck } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  readonly open: boolean;
  readonly setOpen: (open: boolean) => void;
};

type Command = {
  title: string;
  description?: string;
  role: 'action' | 'page';
  href?: string;
  actionId?: 'create-task' | 'show-uncompleted';
};

const defaultCommands: Command[] = [
  { title: 'Create new task', description: 'create new task', role: 'action' },
  {
    title: 'Show all uncompleted tasks',
    description: 'show all uncompleted tasks',
    role: 'action',
  },
  { title: 'Tasks', description: 'Tasks page', role: 'page', href: '/tasks' },
  {
    title: 'Settings',
    description: 'User settings page',
    role: 'page',
    href: '/settings',
  },
];

const getDefaultCommands = (pathname: string) => {
  return defaultCommands.filter(({ href }) => href !== pathname);
};

export default function SearchModal({ open, setOpen }: Props) {
  console.log('rerender');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSelect = ({ role, href }: Pick<Command, 'href' | 'role'>) => {
    if (role === 'page') {
      setOpen(false);
      navigate(href || '/');
    }
    // TODO add switch for actions
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggestions'>
            {getDefaultCommands(pathname).map(({ title, role, href }) => (
              <CommandItem
                key={title}
                className='cursor-pointer pointer-events-auto'
                onSelect={() => handleSelect({ role, href })}
              >
                {role === 'action' ? <LucideCircleCheck /> : <ArrowRightIcon />}
                {title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
