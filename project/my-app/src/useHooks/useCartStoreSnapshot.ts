import { useSyncExternalStore } from 'react'
import { cartStore } from '@/lib/state/cartStore'

/**
 * Adapter som kobler XState store mot Reacts useSyncExternalStore,
 * slik at komponenten rerenderes på alle relevante state-endringer.
 */
export function useCartStoreSnapshot() {
  // Adapter: XState store.subscribe tar observer, men useSyncExternalStore vil ha enkel callback.
  const subscribe = (onStoreChange: () => void) => {
    // Vi bruker .subscribe fra XState, men pakker callback inn i observer-objekt
    const subscription = cartStore.subscribe({
      next: onStoreChange,
      error: () => {}, // ignorerer errors for UI state
      complete: () => {}
    })
    // Returner unsubscribe-funksjonen
    return () => subscription.unsubscribe()
  }

  const getSnapshot = () => cartStore.getSnapshot()

  return useSyncExternalStore(subscribe, getSnapshot)
}
