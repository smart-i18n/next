import o from 'objectools'
import config from './config'
import type Locale from './Locale'
import {createIdentityFallbackDictionary} from './utils'

export const createDict = (locale: Locale) => {
  const rawDict = o(config.dictionary).map((translations) => translations[locale.code] ?? translations[locale.language])
  return createIdentityFallbackDictionary(rawDict, locale)
}
