import type { Cart } from '@/types'
import { CartLineItem } from '@/components/cart/CartLineItem'
import { useCartPending } from '@/useHooks/useCartPending'
/**
 * Renders the main body of the cart, displaying line items or an empty message.
 * @component
 */
export const CartBody = ({ cart }: { cart: Cart | null | undefined }) => {
  const pending = useCartPending() > 0
  const isCartEmpty = !cart || cart.lines.length === 0

  if (pending && isCartEmpty) {
    return <p className='flex-1 p-4 text-center text-muted-foreground'>Laster handlekurv...</p>
  }

  if (isCartEmpty) {
    return (
      <div className='flex flex-1 items-center justify-center p-4'>
        <p className='text-muted-foreground'>Du har ingen varer i handlekurven.</p>
      </div>
    )
  }

  return (
    <div className='flex-1 overflow-y-auto p-4'>
      <ul className='space-y-4'>
        {cart.lines.map(line => (
          <CartLineItem key={line.id} line={line} />
        ))}
      </ul>
    </div>
  )
}
