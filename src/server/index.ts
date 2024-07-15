import {headers} from 'next/headers'
import {cache} from 'react'
import {createDict} from '../dictionaries'
import {I18nContext} from '../models'
import {createLocale, createTranslator} from '../utils'
import LocaleParam = I18n.LocaleParam

export const getLocaleParam = () => headers().get('x-locale-param') as LocaleParam

export const createServerI18n = cache((localeParam: LocaleParam): I18nContext => {
  const locale = createLocale(localeParam)
  const dict = createDict(locale)
  const t = createTranslator(locale.code, dict)
  return {locale, t, dict, localeParam}
})

// Export a `PromiseLike` value that resolves with `createServerI18n(getLocaleParam())`:
export default {
  then<TResult1 = I18nContext, TResult2 = never>(
    onFulfilled?: ((value: I18nContext) => TResult1 | PromiseLike<TResult1>) | null,
    onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2> {
    try {
      const resolvedValue = createServerI18n(getLocaleParam()) // Should be resolved IN `then` body! otherwise couldn't call `headers()`
      return Promise.resolve(onFulfilled?.(resolvedValue) ?? (resolvedValue as unknown as TResult1))
    } catch (error) {
      return onRejected ? Promise.resolve(onRejected(error)) : Promise.reject(error)
    }
  },
}
