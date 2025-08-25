# DESIGN SYSTEM FOR UTEKOS HEADLESS

## Oppdatering

- Nye installasjoner:

- Swiper
  - Hensikt: Behøver funksjonalitet i forbindelse med bilder av høyeste kvalitet. Swiper var et naturlig valg. God erfaring med verktøyet, og er anerkjent som "best in class" stort sett overalt.

- BreadCrumb
  - Hensikt med installasjon: Beviselig et robust, fleksibelt enkelt og verktøy. Ønsker BreadCrumb for brukervennlighet.
- Command
  - Årsak: Skal brukes ved ulike interaksjoner. Eksempelvis aktuell for søkefelt i Header og dens påfølgende command-dialog.
    Tilbyr enestående design, funksjonalitet og innehar kodestruktør som vi støtter.
- Card
  - Hensikt med installasjon: Benyttes ved eksempelvis ProductCard-komponenter og andre lignende funksjoner. Gjør utviklerprosessen svært effektiv, uten å gå på kompromiss med kvalitet - tvert i mot; Høy kvalitet i alle ledd, og innehar samtidig elegant kodestruktur.
- Dialog
  - Hensikt med installasjon: Brukes sammen med Command i samme use caser. Sannsynligvis aktuell for annen interaksjon også. Tilbyr enestående design, funksjonalitet og innehar kodestruktør som vi støtter.
- Input
  - Hensikt med innstallasjon: Tilbyr det samme som de overnevnte. Holder oss til samme lib. Svært fleksibel da den kan brukes ved svært mange ulike use caser.
- Separator - Medfølger Sidebar-installasjon. Tilbyr design av høy kvalitet. Spesifikk use case er ikke fastsaatt.
- Skeleton
  - Hensikt med innstallasjon: Bruke som fallback / ifm loading/pending. Høy UI-standard. Holder oss til ett lib.
- Sidebar
  - Hensikt med innstallasjon: Svært kompleks fil, men tilbyr et univers av muligheter for å sørge for design, ytelse og brukervennlighet i verdensklasse. I første omgang skal noe dens funksjonalitet skinne ifm med CommandDialog. Bør imidertid aktivt lete etter andre områder noe av dens kvaliteter kan benyttes, da det er av svært høy kvalitet.
- Tooltip - Medfølgende komponent/util ifm installasjon av Sidebar. Tilbyr UX som er verdt å benytte seg av når det først er tilgjengelig.

## Installed devDependencies

- tailwindcss ^4
- tailwindcss/postcss ^4
- tw-animate-css: ^1.3.7,

## Installed dependencies

- lucide-react: ^0.540.0,
  "@hookform/resolvers": "^5.2.1",
  "@radix-ui/react-accordion": "^1.2.12",
  "@radix-ui/react-aspect-ratio": "^1.1.7",
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-navigation-menu": "^1.2.14",
  "@radix-ui/react-separator": "^1.1.7",
  "@radix-ui/react-slot": "^1.2.3",
  "@radix-ui/react-tooltip": "^1.2.8",
  "@radix-ui/react-slot": ^1.2.3,
  "radix-ui": ^1.4.3,
  "react-hook-form": ^7.62.0,-
  "swiper": "^11.2.10",
  "tailwind-merge": "^3.3.1",
  "vaul": "^1.1.2"

## Installed Components from shadcn

- Accordion
- Aspect-Ratio
- BreadCrumb
- Button
- Command
- Card
- Dialog
- Drawer
- Input
- Sheet
- Navigation-Menu
- Input
- Separator
- Skeleton
- Sidebar
- Tooltip

## Main CSS File

- src/app/globals.css

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --ds-background-200: hsla(var(--ds-background-200-value), 1);
}

:root {
  --radius: 0.625rem;
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
  --ds-background-200-value: 0, 0%, 0%;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Auto-innstallerte utils fra schadcn

```typescript
import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}

//Blir eksportert fra index.ts som cn
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function className(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default className
```

## Contents of the component files

### Accordion

```tsx
//Path: src/components/ui/accordion.tsx
'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot='accordion' {...props} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot='accordion-item' className={cn('border-b last:border-b-0', className)} {...props} />
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger data-slot='accordion-trigger' className={cn('focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180', className)} {...props}>
        {children}
        <ChevronDownIcon className='text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200' />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content data-slot='accordion-content' className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm' {...props}>
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

### Button

```tsx
//Path: src/components/ui/button.tsx

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
      destructive: 'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
      outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
      secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
      link: 'text-primary underline-offset-4 hover:underline'
    },
    size: {
      default: 'h-9 px-4 py-2 has-[>svg]:px-3',
      sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
      lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
      icon: 'size-9'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

export default function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return <Comp data-slot='button' className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
```

### Drawer

```tsx
//Path: src/components/ui/drawer.tsx

'use client'

import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

import { cn } from '@/lib/utils'

function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot='drawer' {...props} />
}

function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot='drawer-trigger' {...props} />
}

function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot='drawer-portal' {...props} />
}

function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot='drawer-close' {...props} />
}

function DrawerOverlay({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return <DrawerPrimitive.Overlay data-slot='drawer-overlay' className={cn('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50', className)} {...props} />
}

function DrawerContent({ className, children, ...props }: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot='drawer-portal'>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot='drawer-content'
        className={cn(
          'group/drawer-content bg-background fixed z-50 flex h-auto flex-col',
          'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b',
          'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t',
          'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm',
          'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm',
          className
        )}
        {...props}
      >
        <div className='bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block' />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='drawer-header' className={cn('flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left', className)} {...props} />
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='drawer-footer' className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return <DrawerPrimitive.Title data-slot='drawer-title' className={cn('text-foreground font-semibold', className)} {...props} />
}

function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return <DrawerPrimitive.Description data-slot='drawer-description' className={cn('text-muted-foreground text-sm', className)} {...props} />
}

export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription }
```

## Aspect Ratio

```tsx
'use client'

import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'

function AspectRatio({ ...props }: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot='aspect-ratio' {...props} />
}

export { AspectRatio }
```

## Input

```tsx
import * as React from 'react'

import { cn } from '@/lib/utils/index'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return <input type={type} data-slot='input' className={cn('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className)} {...props} />
}

export { Input }
```

### Sheet

```tsx
//Path: src/components/ui/sheet.tsx

'use client'

import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot='sheet' {...props} />
}

function SheetTrigger({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot='sheet-trigger' {...props} />
}

function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot='sheet-close' {...props} />
}

function SheetPortal({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot='sheet-portal' {...props} />
}

function SheetOverlay({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return <SheetPrimitive.Overlay data-slot='sheet-overlay' className={cn('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50', className)} {...props} />
}

function SheetContent({
  className,
  children,
  side = 'right',
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content data-slot='sheet-content' className={cn('bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500', side === 'right' && 'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm', side === 'left' && 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm', side === 'top' && 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b', side === 'bottom' && 'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t', className)} {...props}>
        {children}
        <SheetPrimitive.Close className='ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none'>
          <XIcon className='size-4' />
          <span className='sr-only'>Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='sheet-header' className={cn('flex flex-col gap-1.5 p-4', className)} {...props} />
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='sheet-footer' className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return <SheetPrimitive.Title data-slot='sheet-title' className={cn('text-foreground font-semibold', className)} {...props} />
}

function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return <SheetPrimitive.Description data-slot='sheet-description' className={cn('text-muted-foreground text-sm', className)} {...props} />
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription }
```

### BreadCrumb

```tsx
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { ChevronRight, MoreHorizontal } from 'lucide-react'

import { cn } from '@/lib/utils/index'

function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label='breadcrumb' data-slot='breadcrumb' {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return <ol data-slot='breadcrumb-list' className={cn('text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5', className)} {...props} />
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot='breadcrumb-item' className={cn('inline-flex items-center gap-1.5', className)} {...props} />
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'a'

  return <Comp data-slot='breadcrumb-link' className={cn('hover:text-foreground transition-colors', className)} {...props} />
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot='breadcrumb-page' role='link' aria-disabled='true' aria-current='page' className={cn('text-foreground font-normal', className)} {...props} />
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li data-slot='breadcrumb-separator' role='presentation' aria-hidden='true' className={cn('[&>svg]:size-3.5', className)} {...props}>
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span data-slot='breadcrumb-ellipsis' role='presentation' aria-hidden='true' className={cn('flex size-9 items-center justify-center', className)} {...props}>
      <MoreHorizontal className='size-4' />
      <span className='sr-only'>More</span>
    </span>
  )
}

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis }
```

### Dialog

```tsx
'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils/index'

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot='dialog' {...props} />
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot='dialog-close' {...props} />
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return <DialogPrimitive.Overlay data-slot='dialog-overlay' className={cn('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50', className)} {...props} />
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot='dialog-portal'>
      <DialogOverlay />
      <DialogPrimitive.Content data-slot='dialog-content' className={cn('bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg', className)} {...props}>
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot='dialog-close' className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <XIcon />
            <span className='sr-only'>Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='dialog-header' className={cn('flex flex-col gap-2 text-center sm:text-left', className)} {...props} />
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='dialog-footer' className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot='dialog-title' className={cn('text-lg leading-none font-semibold', className)} {...props} />
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description data-slot='dialog-description' className={cn('text-muted-foreground text-sm', className)} {...props} />
}

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger }
```

### Sidebar

```tsx
'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { PanelLeftIcon } from 'lucide-react'

import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils/index'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const SIDEBAR_COOKIE_NAME = 'sidebar_state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = '16rem'
const SIDEBAR_WIDTH_MOBILE = '18rem'
const SIDEBAR_WIDTH_ICON = '3rem'
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

type SidebarContextProps = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile(open => !open) : setOpen(open => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? 'expanded' : 'collapsed'

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot='sidebar-wrapper'
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style
            } as React.CSSProperties
          }
          className={cn('group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full', className)}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === 'none') {
    return (
      <div data-slot='sidebar' className={cn('bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col', className)} {...props}>
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar='sidebar'
          data-slot='sidebar'
          data-mobile='true'
          className='bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden'
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className='sr-only'>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className='flex h-full w-full flex-col'>{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className='group peer text-sidebar-foreground hidden md:block' data-state={state} data-collapsible={state === 'collapsed' ? collapsible : ''} data-variant={variant} data-side={side} data-slot='sidebar'>
      {/* This is what handles the sidebar gap on desktop */}
      <div data-slot='sidebar-gap' className={cn('relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear', 'group-data-[collapsible=offcanvas]:w-0', 'group-data-[side=right]:rotate-180', variant === 'floating' || variant === 'inset' ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]' : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)')} />
      <div
        data-slot='sidebar-container'
        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left' ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]' : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset' ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]' : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className
        )}
        {...props}
      >
        <div data-sidebar='sidebar' data-slot='sidebar-inner' className='bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm'>
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar='trigger'
      data-slot='sidebar-trigger'
      variant='ghost'
      size='icon'
      className={cn('size-7', className)}
      onClick={event => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className='sr-only'>Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar()

  return <button data-sidebar='rail' data-slot='sidebar-rail' aria-label='Toggle Sidebar' tabIndex={-1} onClick={toggleSidebar} title='Toggle Sidebar' className={cn('hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex', 'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize', '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize', 'hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full', '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2', '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2', className)} {...props} />
}

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return <main data-slot='sidebar-inset' className={cn('bg-background relative flex w-full flex-1 flex-col', 'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2', className)} {...props} />
}

function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return <Input data-slot='sidebar-input' data-sidebar='input' className={cn('bg-background h-8 w-full shadow-none', className)} {...props} />
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='sidebar-header' data-sidebar='header' className={cn('flex flex-col gap-2 p-2', className)} {...props} />
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='sidebar-footer' data-sidebar='footer' className={cn('flex flex-col gap-2 p-2', className)} {...props} />
}

function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator data-slot='sidebar-separator' data-sidebar='separator' className={cn('bg-sidebar-border mx-2 w-auto', className)} {...props} />
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='sidebar-content' data-sidebar='content' className={cn('flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden', className)} {...props} />
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='sidebar-group' data-sidebar='group' className={cn('relative flex w-full min-w-0 flex-col p-2', className)} {...props} />
}

function SidebarGroupLabel({ className, asChild = false, ...props }: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div'

  return <Comp data-slot='sidebar-group-label' data-sidebar='group-label' className={cn('text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0', 'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0', className)} {...props} />
}

function SidebarGroupAction({ className, asChild = false, ...props }: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot='sidebar-group-action'
      data-sidebar='group-action'
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='sidebar-group-content' data-sidebar='group-content' className={cn('w-full text-sm', className)} {...props} />
}

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul data-slot='sidebar-menu' data-sidebar='menu' className={cn('flex w-full min-w-0 flex-col gap-1', className)} {...props} />
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot='sidebar-menu-item' data-sidebar='menu-item' className={cn('group/menu-item relative', className)} {...props} />
}

const sidebarMenuButtonVariants = cva('peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0', {
  variants: {
    variant: {
      default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
      outline: 'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]'
    },
    size: {
      default: 'h-8 text-sm',
      sm: 'h-7 text-xs',
      lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : 'button'
  const { isMobile, state } = useSidebar()

  const button = <Comp data-slot='sidebar-menu-button' data-sidebar='menu-button' data-size={size} data-active={isActive} className={cn(sidebarMenuButtonVariants({ variant, size }), className)} {...props} />

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side='right' align='center' hidden={state !== 'collapsed' || isMobile} {...tooltip} />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot='sidebar-menu-action'
      data-sidebar='menu-action'
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        showOnHover && 'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0',
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='sidebar-menu-badge' data-sidebar='menu-badge' className={cn('text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none', 'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground', 'peer-data-[size=sm]/menu-button:top-1', 'peer-data-[size=default]/menu-button:top-1.5', 'peer-data-[size=lg]/menu-button:top-2.5', 'group-data-[collapsible=icon]:hidden', className)} {...props} />
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div data-slot='sidebar-menu-skeleton' data-sidebar='menu-skeleton' className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)} {...props}>
      {showIcon && <Skeleton className='size-4 rounded-md' data-sidebar='menu-skeleton-icon' />}
      <Skeleton
        className='h-4 max-w-(--skeleton-width) flex-1'
        data-sidebar='menu-skeleton-text'
        style={
          {
            '--skeleton-width': width
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul data-slot='sidebar-menu-sub' data-sidebar='menu-sub' className={cn('border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5', 'group-data-[collapsible=icon]:hidden', className)} {...props} />
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot='sidebar-menu-sub-item' data-sidebar='menu-sub-item' className={cn('group/menu-sub-item relative', className)} {...props} />
}

function SidebarMenuSubButton({
  asChild = false,
  size = 'md',
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean
  size?: 'sm' | 'md'
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : 'a'

  return <Comp data-slot='sidebar-menu-sub-button' data-sidebar='menu-sub-button' data-size={size} data-active={isActive} className={cn('text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0', 'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground', size === 'sm' && 'text-xs', size === 'md' && 'text-sm', 'group-data-[collapsible=icon]:hidden', className)} {...props} />
}

export { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar }
```

### Skeleton

```tsx
import { cn } from '@/lib/utils/index'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='skeleton' className={cn('bg-accent animate-pulse rounded-md', className)} {...props} />
}

export { Skeleton }
```

### Command

```tsx
'use client'

import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return <CommandPrimitive data-slot='command' className={cn('bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md', className)} {...props} />
}

function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className='sr-only'>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className={cn('overflow-hidden p-0', className)} showCloseButton={showCloseButton}>
        <Command className='[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'>{children}</Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot='command-input-wrapper' className='flex h-9 items-center gap-2 border-b px-3'>
      <SearchIcon className='size-4 shrink-0 opacity-50' />
      <CommandPrimitive.Input data-slot='command-input' className={cn('placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50', className)} {...props} />
    </div>
  )
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List data-slot='command-list' className={cn('max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto', className)} {...props} />
}

function CommandEmpty({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty data-slot='command-empty' className='py-6 text-center text-sm' {...props} />
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return <CommandPrimitive.Group data-slot='command-group' className={cn('text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium', className)} {...props} />
}

function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return <CommandPrimitive.Separator data-slot='command-separator' className={cn('bg-border -mx-1 h-px', className)} {...props} />
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return <CommandPrimitive.Item data-slot='command-item' className={cn("data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)} {...props} />
}

function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot='command-shortcut' className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)} {...props} />
}

export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator }
```

### Card

```tsx
import * as React from 'react'

import { cn } from '@/lib/utils/index'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card' className={cn('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className)} {...props} />
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-header' className={cn('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', className)} {...props} />
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-title' className={cn('leading-none font-semibold', className)} {...props} />
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-description' className={cn('text-muted-foreground text-sm', className)} {...props} />
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-action' className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)} {...props} />
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-content' className={cn('px-6', className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-footer' className={cn('flex items-center px-6 [.border-t]:pt-6', className)} {...props} />
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
```

### Input

```tsx
import * as React from 'react'

import { cn } from '@/lib/utils/index'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return <input type={type} data-slot='input' className={cn('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className)} {...props} />
}

export { Input }
```

## Layout-komponenter

Tar i bruk komponenter som `OptionsColumn`, `GalleryColumn`, `CardGrid`, `ProductGallery`, `QuantitySelector`, `SizeSelector`, `ColorSelector`, `ProductGrid` og `Price`.\*:

### Hensikt

Hensikten er todelt, men handler overordnet om kodestruktur og lesbarhet.
Komponentene har ulik format/funksjon, og kan ikke defineres som det samme - i mine øyne.

Eksempelvis er OptionsColumn, GalleryColumn, ProductColumn og delvis Price skapt for å gjøre filen de opererer i mer lesbar og enklere å feilsøke i. I en kodefil med 100 <div> etterfulgt av masse tailwind-syntaks krever kognetiv energi, tid og kan medføre usikkerhet når man skal navigere, forstå sammenheng (se hvor ting starter og slutter) og etablere oversikt.
Ved implementasjon av nevnte komponenter eliminerer vi disse faktorene og tvert i mot gjør kodefilen til en sann glede å operere i. I sum resulterer det også i en tynnere "hovedfil", som gjør den enklere å vedlikeholde, tilføre mer "features" og feilsøke i. Samtidig tilrettelegger vi for gjenbrukbarhet og reduserer faren for å gjøre feil.

Dette er endringer som er i tråd med de fleste leddene av målsetningen om funksjonell programmering, selvstendige funksjoner, rekombinering og alt annet som står i filen KODESTRUKTUR.md.

## Ulikt design

Som nevnt er disse "komponentene" av ulik art, se eksempel under:

```tsx
//src/compoents/ui/OptionsColumn
import type { ReactNode } from 'react'

export const OptionsColumn = ({ children }: { readonly children: ReactNode }) => (
  <div aria-labelledby='product-options' className='lg:col-span-3'>
    {children}
  </div>
)

export default OptionsColumn
```

- OptionsColumn.tsx kan knapt bli mindre, men den, sammen med andre importerte mini-komponenter, gjør ProductPageView.tsx vesentlig mer triveligere å håndtere.

```tsx
import type { ReactNode } from 'react'

export const ProductGrid = ({ children }: { readonly children: ReactNode }) => <div className='grid grid-cols-1 gap-8 lg:grid-cols-10 lg:gap-16'>{children}</div>
export default ProductGrid
```

- ProductGrid importeres i en annen fil, men gjør noe av den samme jobben

I eksempelet under ser man som menes med at det er to ulike type komponenter, ref syntaks og innhold.

```tsx
'use client'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y } from 'swiper/modules'
import type { Image as Imgs } from '@/types'
type ProductGalleryProps = {
  title: string
  images: Imgs[]
}

export function ProductGallery({ title, images }: ProductGalleryProps) {
  if (images.length === 0) {
    return <div className='relative aspect-video w-full overflow-hidden rounded-lg md:max-h-[600px] bg-surface-raised/40' />
  }

  return (
    <div className='space-y-4'>
      <Swiper modules={[Navigation, A11y]} spaceBetween={10} navigation loop={images.length > 1} className='w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto overflow-hidden rounded-lg' aria-label={`Produktbilder for ${title}`}>
        {images.map((mediaImage, index) => (
          <SwiperSlide key={mediaImage.id} className='aspect-[2/3] flex items-center justify-center mx-auto'>
            <Image src={mediaImage.url} alt={mediaImage.altText || `Bilde av ${title}`} fill sizes='(min-width: 1024px) 24rem, (min-width: 768px) 20rem, 16rem' className='object-contain md:max-w-[300px] md:max-h-[450px] mx-auto place-self-center' priority={index === 0} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductGallery
```

I sum, sammen med mange flere andre komponenter, gjør de ProductPageView til en svært oversiktlig og lesbar komponent og fil.

```tsx
//Utdrag av src/components/ProductPageView.tsx
<ProductGrid>
      <GalleryColumn>
        <div className='mb-8 text-left'>
          <h1 className='text-3xl font-bold md:text-4xl'>{title}</h1>
          {subtitle ?
            <p className='mt-2 text-lg text-foreground-on-dark/80'>{subtitle}</p>
          : null}
        </div>
        <div className='md:sticky md:top-24 h-fit'>
          <div className='mx-auto max-w-xl'>
            <div className='aspect-video w-full rounded-2xl bg-surface-raised/20 p-4'>
              <ProductGallery title={title} images={variantImages} />
            </div>
          </div>
        </div>
      </GalleryColumn>

      <OptionsColumn>
        <Price amount={selectedVariant.price.amount} currencyCode={selectedVariant.price.currencyCode} />
        <section aria-labelledby='product-options'>
          <h2 id='product-options' className='sr-only'>
            Produktvalg
          </h2>

          <div className='mt-30 space-y-8'>
            {sortedOptions.map(opt => {
              const lower = opt.name.toLowerCase()
              const selectorProps = {
                optionName: opt.name,
                values: opt.optionValues.map(v => v.name),
                variants: allVariants,
                selectedVariant,
                onSelect: onOptionChange
              } as const

              if (lower === 'størrelse') return <SizeSelector key={opt.name} {...selectorProps} />
              if (lower === 'farge') return <ColorSelector key={opt.name} {...selectorProps} />
              return null
            })}
          </div>

          <div className='mt-8'>
            <AddToCart variantId={selectedVariant.id} />
          </div>

          <article aria-label='Produktbeskrivelse' className='prose prose-invert mt-12 max-w-none text-foreground-on-dark/80'>
            <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
          </article>
        </section>
      </OptionsColumn>
    </ProductGrid>

    <ProductPageAccordion variantProfile={variantProfile} />
  </main>
// )
// }

export default ProductPageView
```

- Dette er svært gode eksempler på hvordan navnesetting kan gjøre en kodefil lett å håndtere og en glede å arbeide i. Ved anledning er det nok enda mer å gå på. Å utfordre disse grensene er motiverende. Her var oppgaven enkel. Å bevege en div ut og inn er mindre komplisert enn en tradisjonell funksjon.

- Uansett: Kodelinjer som lever med uavhengige, selvstendige trinn som kan brukes for å løse ethvert problem og bli ekte komponister av koden vår - er fortsatt den ultimate drøm.
