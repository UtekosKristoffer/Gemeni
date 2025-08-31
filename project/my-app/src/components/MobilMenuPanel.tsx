//Path: src/components/MobileMenuPanel.tsx

'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import MobileMenuItem from '@/components/MobileMenuItem'

import type { MenuItem } from '@/types'

export function MobileMenuPanel({ menu = [], isOpen, onOpenChange }: { menu?: MenuItem[]; isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button className='hidden'>Åpne mobilmeny</button>
      </SheetTrigger>

      <SheetContent side='left' className='w-full max-w-sm p-0 md:hidden'>
        <SheetHeader className='p-4 border-b'>
          <SheetTitle>Meny</SheetTitle>
        </SheetHeader>
        <nav className='flex-grow overflow-y-auto'>
          <ul className='flex flex-col'>
            {menu.map(item => (
              <MobileMenuItem key={item.title} item={item} />
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenuPanel
