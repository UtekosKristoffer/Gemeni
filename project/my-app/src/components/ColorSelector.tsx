'use client'

import OptionButton from './ui/OptionButton'
import type { ProductVariant } from '@/types'
type ColorSelectorProps = {
  optionName: string
  values: string[]
  variants: ProductVariant[]
  selectedVariant: ProductVariant
  onSelect: (optionName: string, value: string) => void
}

export function ColorSelector({ optionName, values, variants, selectedVariant, onSelect }: ColorSelectorProps) {
  const selectedSize = selectedVariant.selectedOptions.find(opt => opt.name.toLowerCase() === 'størrelse')?.value

  return (
    <div className='space-y-3'>
      {values.map(colorValue => {
        // Finner en variant som representerer denne fargen
        // Logikken din for å finne representativeVariant er god og beholdes.
        const representativeVariant = variants.find(variant => {
          const hasColor = variant.selectedOptions.some(opt => opt.value === colorValue)
          // Hvis det ikke er valgt en størrelse, er det OK å bare matche farge
          const hasSize = !selectedSize || variant.selectedOptions.some(opt => opt.value === selectedSize)
          return hasColor && hasSize
        })

        // Hent data direkte fra den nye, forutsigbare strukturen
        const variantProfileRef = representativeVariant?.variantProfile?.reference

        const colorLabel = variantProfileRef?.colorLabel?.value || colorValue
        const backgroundColor = variantProfileRef?.backgroundColor?.value
        const swatchDotColor = variantProfileRef?.swatchHexcolorForVariant?.value

        const isSelected = selectedVariant.selectedOptions.some(opt => opt.value === colorValue)

        return (
          <OptionButton key={colorValue} isSelected={isSelected} onClick={() => onSelect(optionName, colorValue)}>
            <span className='font-semibold'>{colorLabel}</span>
            <div
              className='relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/10'
              style={{ background: backgroundColor || 'transparent' }} // Legger til fallback
            >
              <div
                className='absolute inset-1 rounded-full border-2 border-orange-500 transition-colors data-[selected=true]:border-white'
                style={{ backgroundColor: swatchDotColor || 'transparent' }} // Legger til fallback
                data-selected={isSelected}
              />
            </div>
          </OptionButton>
        )
      })}
    </div>
  )
}

export default ColorSelector
