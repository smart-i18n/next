import {R, T, Y} from 'anstyle'
import type {ReactElement} from 'react'
import {Children, isValidElement} from 'react'
import {BASE_LOCALE_CODE, I18N_MODEL} from './config'
import Locale from './Locale'
import type {I18nModel} from './models'
import Dict = I18n.Dict
import Dictionary = I18n.Dictionary
import Translatable = I18n.Translatable
import LocaleParam = I18n.LocaleParam
import Lang = I18n.Lang

/**
 * Make the dictionary to return the key itself when it doesn't have the key.
 * @example
 * const dict = {x: 'y'}
 * const identityFallbackDict = createIdentityFallbackDictionary(dict, ...)
 * identityFallbackDict.x === 'y'
 * identityFallbackDict.z === 'z' // NOT `undefined`
 */
export function createIdentityFallbackDictionary(rawDict: Partial<Dict>, locale: Locale): Dict {
  return new Proxy(rawDict, {
    get(rawDict: Partial<Dict>, text: string | symbol): string | undefined {
      // noinspection SuspiciousTypeOfGuard
      if (typeof text === 'symbol' || ['toJSON', '$$typeof', '@@iterator'].includes(text))
        // @ts-expect-error // `Reflect.get()` has the same signature:
        return Reflect.get(...arguments)

      const translatedText = rawDict[text as Translatable]
      if (translatedText != null) return translatedText || text // CONVENTION: Return the same `text` if `rawDict[text] === ''`  with no warn.
      if (
        process.env.NODE_ENV === 'development' &&
        BASE_LOCALE_CODE !== locale.language &&
        !['0', 'then'].includes(text)
      )
        console.warn(`${Y}MISSED TRANSLATION FOR: ${R}%s${T}`, text)
      return text
    },
  }) as Dict
}

export const flattenJsx = (element: ReactElement): string =>
  `<${element.type}>` +
  Children.map(element.props.children, (child: unknown) => (isValidElement(child) ? flattenJsx(child) : child)) +
  `</${element.type}>`

export {createTranslator} from './translator'
export {type Dictionary, type Translatable}

/**
 * Filter unsupported members of `Locale` instance (`Intl.Collator`, `Intl.DateTimeFormat`, etc.) to avoid this error:
 *
 * > Error: **Only plain objects, and a few built-ins, can be passed to Client Components from Server Components.**
 * > Classes or null prototypes are not supported.
 */
export function extractSerializableLocale(locale: Locale): SerializableLocale {
  const {number, date, time, dateTime, collator, list, plural, relativeTime, ...serializableLocale} = locale

  for (const [property] of Object.entries(Object.getOwnPropertyDescriptors(Intl.Locale.prototype)).filter(
    ([_, descriptor]) => typeof descriptor.get === 'function',
  )) // @ts-expect-error // Manually assign the value of `Intl.Locale` properties to `serverLocale`, as they're not enumerable:
    serializableLocale[property] = locale[property]

  return serializableLocale
}
export type SerializableLocale = Omit<
  Locale,
  'number' | 'date' | 'time' | 'dateTime' | 'collator' | 'list' | 'plural' | 'relativeTime'
>

export const extractLocaleCodesFromI18nModel = (I18N_MODEL: I18nModel) =>
  Object.values(I18N_MODEL).flatMap(({localeCodes}) => localeCodes)

export const extractLocaleParamFromPathname = (pathname: string) => pathname.split('/', 2)[1] as LocaleParam // `pathname` starts with `/` => `pathname.split('/')[0] === ''`

export const createLocale = (localeParam: LocaleParam) =>
  new Locale(I18N_MODEL[localeParam as Lang]?.localeCodes[0] ?? localeParam)
