import { ModeToggle } from '@/components/mode-toggle.tsx';
import Search from '@/components/Search.tsx';
import Settings from '@/components/Settings';
import { cn } from '@/lib/utils';

export function UsersAria({
  className,
  withKbd = true,
}: {
  readonly className?: string;
  readonly withKbd?: boolean;
}) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <Search withKbd={withKbd} />
      <ModeToggle />
      <Settings />
    </div>
  );
}
