import { DrawerFooter } from '@/components/ui/drawer'
import { useCartPending } from '@/useHooks/useCartPending'
import type { Cart } from '@/types'
import { formatPrice } from '@/lib/utils'

/**
 * Renders the footer of the cart, including subtotal and checkout button.
 * @component
 */
export const CartFooter = ({ cart }: { cart: Cart | null | undefined }) => {
  const pending = useCartPending() > 0

  if (!cart || cart.lines.length === 0) {
    return null
  }

  return (
    <DrawerFooter className='border-t'>
      <div className='flex justify-between font-semibold'>
        <span>Subtotal</span>
        <span>{formatPrice(cart.cost.subtotalAmount)}</span>
      </div>
      <a href={cart.checkoutUrl} className={`mt-4 block w-full rounded-md bg-primary py-3 text-center text-sm font-medium text-primary-foreground transition-opacity ${pending ? 'pointer-events-none opacity-50' : 'hover:bg-primary/90'}`} aria-disabled={pending}>
        Gå til kassen
      </a>
    </DrawerFooter>
  )
}
