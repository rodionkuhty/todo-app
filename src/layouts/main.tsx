import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip.tsx';
import Menu from '@/components/Menu.tsx';

export function Layout({ children }: { readonly children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='theme'>
      <TooltipProvider>
        <div className='min-h-screen flex flex-col bg-background text-foreground'>
          <header className='border-b p-4'>
            <Menu />
          </header>
          <main className='flex-1 p-4'>{children}</main>
          <footer className='border-t p-4 text-center'>© 2026</footer>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default Layout;
