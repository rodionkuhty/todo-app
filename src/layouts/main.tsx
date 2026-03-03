import * as React from 'react';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle.tsx';

export function MenubarMain() {
  return (
    <div className='flex justify-between'>
      <Menubar className='w-72'>
        <MenubarMenu>
          <MenubarTrigger>Home</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarItem>
                New Todo Task <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarSub>
                <MenubarSubTrigger>Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarGroup>
                    <MenubarItem>Email link</MenubarItem>
                    <MenubarItem>Messages</MenubarItem>
                    <MenubarItem>Notes</MenubarItem>
                  </MenubarGroup>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Tasks</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarItem>
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarSub>
                <MenubarSubTrigger>Find</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarGroup>
                    <MenubarItem>Search the web</MenubarItem>
                  </MenubarGroup>
                  <MenubarSeparator />
                  <MenubarGroup>
                    <MenubarItem>Find...</MenubarItem>
                    <MenubarItem>Find Next</MenubarItem>
                    <MenubarItem>Find Previous</MenubarItem>
                  </MenubarGroup>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Settings</MenubarTrigger>
          <MenubarContent className='w-44'>
            <MenubarGroup>
              <MenubarCheckboxItem>Bookmarks Bar</MenubarCheckboxItem>
              <MenubarCheckboxItem checked>Full URLs</MenubarCheckboxItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarItem inset>
                Reload <MenubarShortcut>⌘R</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled inset>
                Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
              </MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarItem inset>Toggle Fullscreen</MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarItem inset>Hide Sidebar</MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <UsersAria />
    </div>
  );
}

export function UsersAria() {
  return (
    <div className=' flex flex-col bg-background text-foreground'>
      <ModeToggle />
    </div>
  );
}

export function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='theme'>
      <div className='min-h-screen flex flex-col bg-background text-foreground'>
        <header className='border-b p-4'>
          <MenubarMain />
        </header>
        <main className='flex-1 p-4'>{children}</main>
        <footer className='border-t p-4 text-center'>© 2026</footer>
      </div>
    </ThemeProvider>
  );
}

export default Layout;
