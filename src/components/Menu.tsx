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

export default function Menu() {
  return (
    <div className='flex items-center justify-between'>
      <NavigationMenu>
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
          <NavigationMenuItem className='hidden md:flex'>
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
      <UsersAria />
    </div>
  );
}
