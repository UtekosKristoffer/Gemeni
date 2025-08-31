import { CartMutationContext } from '@/lib/actors/CartMutationContext'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'
import type { CartLine } from '@/types'
import { useCartPending } from '@/useHooks'
/**
 * Renders a single line item within the cart.
 * @component
 */
export const CartLineItem = ({ line }: { line: CartLine }) => {
  const processRef = CartMutationContext.useActorRef()
  const pending = useCartPending() > 0

  return (
    <li className='flex items-start gap-4'>
      <div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-md border'>
        <Image src={line.merchandise.image?.url ?? '/placeholder.svg'} alt={line.merchandise.image?.altText ?? line.merchandise.title} fill sizes='80px' className='object-cover' />
      </div>

      <div className='flex-1'>
        <h3 className='font-medium'>{line.merchandise.title}</h3>
        <p className='text-sm text-muted-foreground'>{line.merchandise.title}</p>

        <div className='mt-2 flex items-center gap-2'>
          <Button
            variant='outline'
            size='icon'
            aria-label={`Decrease quantity for ${line.merchandise.title}`}
            disabled={pending || line.quantity <= 1}
            onClick={() =>
              processRef.send({
                type: 'UPDATE_LINE',
                input: { lineId: line.id, quantity: line.quantity - 1 }
              })
            }
          >
            <Minus className='size-4' />
          </Button>
          <span className='w-8 text-center text-sm font-medium' aria-live='polite'>
            {line.quantity}
          </span>
          <Button
            variant='outline'
            size='icon'
            aria-label={`Increase quantity for ${line.merchandise.title}`}
            disabled={pending}
            onClick={() =>
              processRef.send({
                type: 'UPDATE_LINE',
                input: { lineId: line.id, quantity: line.quantity + 1 }
              })
            }
          >
            <Plus className='size-4' />
          </Button>
        </div>
      </div>

      <div className='text-right'>
        <Button
          variant='link'
          className='h-auto p-0 text-sm'
          onClick={() =>
            processRef.send({
              type: 'REMOVE_LINE',
              input: { lineId: line.id }
            })
          }
        >
          Fjern
        </Button>
        <p className='mt-2 text-sm font-medium'>{formatPrice(line.merchandise.price)}</p>
      </div>
    </li>
  )
}
