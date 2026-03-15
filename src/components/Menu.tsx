import { UsersAria } from '@/components/UserAria';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils.ts';
import { Menu as MenuIcon } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

export default function Menu() {
  return (
    <div className='flex items-center justify-between'>
      {/* Desktop Menu */}
      <NavigationMenu className='hidden md:flex'>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                'text-foreground transition-colors',
              )}
            >
              <Link to='/'>Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                'text-foreground transition-colors',
              )}
            >
              <Link to='/tasks'>Tasks</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Menu */}
      <div className='md:hidden'>
        <Drawer direction='left'>
          <DrawerTrigger asChild>
            <Button variant='outline' size='icon'>
              <MenuIcon className='size-5' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className='mx-auto w-full max-w-sm'>
              <DrawerHeader className='text-left'>
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>
              <div className='flex flex-col gap-4 p-4'>
                <DrawerClose asChild>
                  <Link to='/' className='text-lg font-medium'>
                    Home
                  </Link>
                </DrawerClose>
                <DrawerClose asChild>
                  <Link to='/tasks' className='text-lg font-medium'>
                    Tasks
                  </Link>
                </DrawerClose>
                <div className='border-t pt-4'>
                  <UsersAria
                    className='flex-col items-start gap-4'
                    withKbd={false}
                  />
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className='hidden md:flex'>
        <UsersAria />
      </div>
    </div>
  );
}
