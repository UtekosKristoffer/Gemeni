//Path: src/components/DesktopNavigation.tsx

'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { className as cn, normalizeShopifyUrl } from '@/lib/utils'

import type { Route } from 'next'
import type { ComponentRef } from 'react'
import type { MenuItem } from '@/types'

export const DesktopNavigation = ({ menu = [] }: { menu?: MenuItem[] }) => {
  const pathname = usePathname()

  return (
    <nav aria-label='Hovednavigasjon' className='hidden lg:block'>
      <NavigationMenu>
        <NavigationMenuList>
          {menu.map(item => {
            const href = normalizeShopifyUrl(item.url) as Route
            const hasSubMenu = item.items && item.items.length > 0
            const isActive = pathname === href

            return (
              <NavigationMenuItem key={item.title}>
                {hasSubMenu ?
                  <>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className='bg-background text-accent-foreground grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>{item.items && item.items.map(subItem => <ListItem key={subItem.url} href={normalizeShopifyUrl(subItem.url) as Route} title={subItem.title} />)}</ul>
                    </NavigationMenuContent>
                  </>
                : <NavigationMenuLink asChild>
                    <Link href={href} className={cn(navigationMenuTriggerStyle(), isActive && 'bg-accent bg-background text-accent-foreground')}>
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                }
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
const ListItem = React.forwardRef<ComponentRef<typeof Link>, React.ComponentPropsWithoutRef<typeof Link> & { title: string }>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link ref={ref} className={cn('block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-muted-foregroundfocus:bg-accent focus:text-accent-foreground', className)} {...props}>
          <div className='text-sm font-medium leading-none'>{title}</div>
          {children && <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>}
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

export default DesktopNavigation
