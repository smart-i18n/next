'use client'
import {usePathname} from 'next/navigation'
import type {ReactNode} from 'react'
import {createContext, useLayoutEffect, useMemo} from 'react'
import type {I18nContext as TI18nContext} from '../models'
import {createTranslator} from '../translator'
import {createIdentityFallbackDictionary, createLocale, extractLocaleParamFromPathname} from '../utils'
import {cookies} from '../utils/cookie'
import Dict = I18n.Dict

export const I18nContext = createContext<TI18nContext>({} as never)

export default function I18nProvider({
  dict: rawDict, // See comments for `identityFallbackDictionary` below
  children,
}: {
  dict: Partial<Dict>
  children: ReactNode
}) {
  const pathname = usePathname()
  const localeParam = extractLocaleParamFromPathname(pathname)
  const locale = useMemo(() => createLocale(localeParam), [localeParam])

  const {dict, t} = useMemo(() => {
    // `identityFallbackDictionary` that is passed from `RootLayout` to here is a `Proxy`. But we receive a simple
    // object (w/o fallback feature) here (`rawDict`). This is because `RootLayout` is a server-component and
    // we are in a client-component. So we have to convert it to a `identityFallbackDictionary` again:
    const identityFallbackDictionary = createIdentityFallbackDictionary(rawDict, locale)
    return {dict: identityFallbackDictionary, t: createTranslator(locale.code, identityFallbackDictionary)}
  }, [locale, rawDict])

  useLayoutEffect(() => {
    if (localeParam !== cookies.localeParam) cookies.localeParam = localeParam
  }, [localeParam, locale])

  return <I18nContext.Provider value={{locale, dict, t, localeParam}}>{children}</I18nContext.Provider>
}
