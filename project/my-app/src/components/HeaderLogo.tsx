import Link from 'next/link'
import Image from 'next/image'

export function HeaderLogo() {
  return (
    <div className='flex items-center'>
      <Link href='/' aria-label='Utekos - Til forsiden'>
        <Image src='/favicon-48x48.png' alt='Utekos logo' width={40} height={40} priority className='rounded-full border border-white/10' />
      </Link>
    </div>
  )
}
export default HeaderLogo
