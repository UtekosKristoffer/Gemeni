/**
 * @file src/lib/utils/menuReducer.ts
 * @module utils/menuReducer
 * @function menuReducer
 * @description Reducer function to manage menu state
 */

import { type State, type Action } from '@/types'

export function menuReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN_MENU':
      return { status: 'OPEN' }
    case 'CLOSE_MENU':
      return { status: 'CLOSED' }
    default:
      return state
  }
}

export default menuReducer
