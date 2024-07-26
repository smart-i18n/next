import LocaleParam = I18n.LocaleParam
import {headers} from 'next/headers'
import {cache} from 'react'
import 'server-only'
import {createDict} from '../dictionaries'
import type {I18nContext} from '../models'
import {createLocale, createTranslator} from '../utils'

export const getLocaleParam = () => headers().get('x-locale-param') as LocaleParam

export const createServerI18n = cache((localeParam: LocaleParam): I18nContext => {
  const locale = createLocale(localeParam)
  const dict = createDict(locale)
  const t = createTranslator(locale.code, dict)
  return {locale, t, dict, localeParam}
})

export const resolveServerI18n = () => createServerI18n(getLocaleParam())
