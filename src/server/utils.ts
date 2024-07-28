import LocaleParam = I18n.LocaleParam
import {headers} from 'next/headers'
import {cache} from 'react'
import 'server-only'
import {createDict} from '../dictionaries'
import type {I18nContext} from '../models'
import {createLocale, createTranslator} from '../utils'

export const getLocaleParam = () => {
  const localeParam = headers().get('x-locale-param') as LocaleParam | undefined
  if (!localeParam)
    throw new Error("Unable to resolve locale-param. Probably you don't configure the middleware correctly.")
  return localeParam
}

export const createServerI18n = cache((localeParam: LocaleParam): I18nContext => {
  const locale = createLocale(localeParam)
  const dict = createDict(locale)
  const t = createTranslator(locale.code, dict)
  return {locale, t, dict, localeParam}
})

export const resolveServerI18n = (localeParam?: LocaleParam) => createServerI18n(localeParam ?? getLocaleParam())
