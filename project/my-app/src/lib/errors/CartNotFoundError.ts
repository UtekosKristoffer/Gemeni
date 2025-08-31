// Path: src/lib/errors.ts/CartNotFoundError.ts
export class CartNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CartNotFoundError'
  }
}

export default CartNotFoundError
