export {}

global {
  namespace I18n {
    /** Should be ⊂ ISO 639-1 codes: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes */
    type Lang = 'fa' | 'en'
    /** Should be ⊂ `Intl.UnicodeBCP47LocaleIdentifier` */
    type LocaleCode = 'fa-IR' | 'fa-AF' | 'en-US'
    /** Should be ⊂ `Lang | LocaleCode` */
    type LocaleParam = Lang /* | LocaleCode */
    /**
     * The locale/language that doesn't need translation. But is the base locale/language that the keys of the
     * dictionary/dictionaries are provided in it.
     *
     * It should be ∈ `Lang | LocaleCode`
     */
    type BaseLocaleCode = Extract<Lang | LocaleCode, 'en'>
    /**
     * Sample practical value would be:
     * ```ts
     * namespace I18n {
     *   import type dictionary from './dictionary.json' // WITHIN `I18n` namespace!
     *   type Translatable = keyof typeof dictionary
     * }
     * ```
     */
    type Translatable = keyof {message: {fa: string}}
    type DictValue = {[K in Exclude<Lang, BaseLocaleCode>]: string} & {
      [P in LocaleCode | BaseLocaleCode]?: string
    }
    /** Multi-language dictionary */
    type Dictionary = {[K in Translatable]: DictValue}
    /** Single-language dictionary */
    type Dict = {[K in Translatable]: string}
  }
}
