import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { DrawerClose, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer'

/**
 * Renders the header section of the cart drawer.
 * @component
 */
export const CartHeader = ({ itemCount }: { itemCount: number }) => {
  const isCartEmpty = itemCount === 0

  return (
    <DrawerHeader className='border-b'>
      <DrawerTitle>Handlekurv ({itemCount})</DrawerTitle>
      <DrawerDescription>{isCartEmpty ? 'Din handlekurv er tom.' : 'Produktene du har valgt.'}</DrawerDescription>
      <DrawerClose asChild>
        <Button variant='ghost' size='icon' className='absolute top-3 right-3'>
          <X className='size-5' />
          <span className='sr-only'>Lukk</span>
        </Button>
      </DrawerClose>
    </DrawerHeader>
  )
}
