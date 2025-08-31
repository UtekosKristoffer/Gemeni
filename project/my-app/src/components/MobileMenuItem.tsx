// src/components/MobileMenuItem.tsx
'use client'
import Link from 'next/link'
import { useState } from 'react'
import type { Route } from 'next'
import type { MenuItem } from '@/types'
import { normalizeShopifyUrl } from '@/lib/utils'

export function MobileMenuItem({ item }: { item: MenuItem }) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const hasSubMenu = item.items && item.items.length > 0

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsSubMenuOpen(!isSubMenuOpen)
  }

  return (
    <li>
      <div className='flex items-center justify-between'>
        <Link href={normalizeShopifyUrl(item.url) as Route} className='flex-grow p-4 text-foreground-on-dark/80'>
          {item.title}
        </Link>
        {hasSubMenu && (
          <button onClick={handleToggle} aria-expanded={isSubMenuOpen} className=' p-4 text-foreground-on-dark/60'>
            <svg className={`h-5 w-5 transition-transform ${isSubMenuOpen ? 'rotate-180' : ''}`} viewBox='0 0 20 20' fill='currentColor'>
              <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
            </svg>
          </button>
        )}
      </div>
      {hasSubMenu && isSubMenuOpen && (
        <ul className='pl-4 bg-white/5'>
          {item.items!.map(subItem => (
            <MobileMenuItem key={subItem.title} item={subItem} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default MobileMenuItem
