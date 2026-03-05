import { UsersAria } from '@/components/UserAria';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div className='flex justify-between'>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to='/'>Home</Link>
          </NavigationMenuItem>
          <NavigationMenuItem className='hidden md:flex'>
            <Link to='/tasks'>Tasks</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <UsersAria />
    </div>
  );
}
