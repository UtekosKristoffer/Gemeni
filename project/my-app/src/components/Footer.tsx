//Path: src/components/Footer.tsx

import Link from 'next/link'
import type { Route } from 'next'

const footerLinks: { href: Route; label: string }[] = [
  // We need to create these pages before typedRoutes will accept them
  // { href: '/personvern', label: 'Personvern' },
  // { href: '/kjopsbetingelser', label: 'Kjøpsbetingelser' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-background mt-auto border-t border-white/10 py-12 text-center'>
      <div className='container mx-auto px-4 sm:px-8'>
        <nav aria-label='Footer-navigasjon'>
          {footerLinks.length > 0 && (
            <ul className='flex flex-wrap items-center justify-center gap-x-6 gap-y-2'>
              {footerLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className='text-sm text-foreground-on-dark/60 transition-colors hover:text-foreground-on-dark'>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
        <p className='mt-8 text-xs text-foreground-on-dark/40'>© {currentYear}, Utekos AS. Alle rettigheter forbeholdt.</p>
      </div>
    </footer>
  )
}
