import type {I18nContext} from '../models'
import {resolveServerI18n} from './utils'

// Export a `PromiseLike` (and so `Usable`) value that resolves with the result of `resolveServerI18n()`:
const i18n = {
  then<TResult1 = I18nContext, TResult2 = never>(
    onFulfilled?: ((value: I18nContext) => TResult1 | PromiseLike<TResult1>) | null,
    onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2> {
    try {
      const resolvedValue = resolveServerI18n() // Should be resolved IN `then` body! otherwise couldn't call `headers()`
      return Promise.resolve(onFulfilled?.(resolvedValue) ?? (resolvedValue as unknown as TResult1))
    } catch (error) {
      return onRejected ? Promise.resolve(onRejected(error)) : Promise.reject(error)
    }
  },
}
export default i18n
