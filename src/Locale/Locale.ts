export default class Locale<
  LocaleCode extends Intl.UnicodeBCP47LocaleIdentifier,
  Lang extends Iso639_1,
> extends Intl.Locale {
  static RTL_LANGUAGES = ['fa', 'ar'] // With `Intl.locale.textInfo.direction` we don't need this constant. But it's not supported by Firefox yet. // https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/intl/locale#browser_compatibility

  code: LocaleCode // Same as `super.baseName` but with `type`
  override language: Lang
  isRtl: boolean
  dirAdjustmentChar: '‏' | '‎'
  direction: Direction
  start: 'right' | 'left'
  end: 'left' | 'right'

  number: Intl.NumberFormat
  date: Intl.DateTimeFormat
  time: Intl.DateTimeFormat
  dateTime: Intl.DateTimeFormat
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#static_properties:
  collator: Intl.Collator
  list: Intl.ListFormat
  plural: Intl.PluralRules
  relativeTime: Intl.RelativeTimeFormat
  // segmenter: Intl.Segmenter // Isn't supported by Firefox: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter#browser_compatibility

  /**
   * Inputs is like to the inputs of the constructor of the super class: `Intl.Locale.new()`
   * @param tag - A string with a [BCP 47 language tag](http://tools.ietf.org/html/rfc5646).
   *  For the general form and interpretation of the locales argument,
   *  see the [`Intl`
   *   page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation).
   * @param options - An
   *   [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/Locale#Parameters)
   *   with some or all of options of the locale.
   */
  constructor(tag: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale, options?: Intl.LocaleOptions) {
    super(tag, options)
    this.language = super.language as Lang
    const localeCode = (this.code = this.baseName as LocaleCode)

    // this.direction = this.textInfo.direction // Not yet supported by Firefox // https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/intl/locale#browser_compatibility
    this.isRtl = Locale.RTL_LANGUAGES.some((lang) => lang === this.language) // this.direction === 'rtl'

    if (this.isRtl) {
      this.direction = 'rtl'
      this.dirAdjustmentChar = '‏'
      this.start = 'right'
      this.end = 'left'
    } else {
      this.direction = 'ltr'
      this.dirAdjustmentChar = '‎'
      this.start = 'left'
      this.end = 'right'
    }

    this.number = new Intl.NumberFormat(localeCode)

    // Similar to `Date.toLocaleDateString()`: // https://stackoverflow.com/a/54960782/5318303
    this.date = new Intl.DateTimeFormat(localeCode)

    // Similar to `Date.toLocaleTimeString()`: // https://stackoverflow.com/a/54960782/5318303
    this.time = new Intl.DateTimeFormat(
      localeCode,
      {timeStyle: 'medium'}, // https://tc39.es/ecma402/#sec-date-time-style-format
    )

    // Similar to `Date.toLocaleString()`: // https://stackoverflow.com/a/54960782/5318303
    this.dateTime = new Intl.DateTimeFormat(localeCode, {
      // https://tc39.es/ecma402/#sec-datetimeformat-abstracts
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })

    this.collator = new Intl.Collator(localeCode)
    this.list = new Intl.ListFormat(localeCode)
    this.plural = new Intl.PluralRules(localeCode)
    this.relativeTime = new Intl.RelativeTimeFormat(localeCode)
    // this.segmenter = new Intl.Segmenter(localeCode)
  }
}
export type Direction = 'rtl' | 'ltr'

/**
 * ISO 639-1 codes.
 * To update it run the below script on its webpage:
 * ```
 * [...document.getElementsByTagName('table')[0].querySelectorAll('tbody>tr>td:nth-of-type(2)')]
 *   .map((td) => `'${td.innerText}'`).join('|')
 * ```
 * @see https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 */
export type Iso639_1 =
  | 'ab'
  | 'aa'
  | 'af'
  | 'ak'
  | 'sq'
  | 'am'
  | 'ar'
  | 'an'
  | 'hy'
  | 'as'
  | 'av'
  | 'ae'
  | 'ay'
  | 'az'
  | 'bm'
  | 'ba'
  | 'eu'
  | 'be'
  | 'bn'
  | 'bi'
  | 'bs'
  | 'br'
  | 'bg'
  | 'my'
  | 'ca'
  | 'ch'
  | 'ce'
  | 'ny'
  | 'zh'
  | 'cu'
  | 'cv'
  | 'kw'
  | 'co'
  | 'cr'
  | 'hr'
  | 'cs'
  | 'da'
  | 'dv'
  | 'nl'
  | 'dz'
  | 'en'
  | 'eo'
  | 'et'
  | 'ee'
  | 'fo'
  | 'fj'
  | 'fi'
  | 'fr'
  | 'fy'
  | 'ff'
  | 'gd'
  | 'gl'
  | 'lg'
  | 'ka'
  | 'de'
  | 'el'
  | 'kl'
  | 'gn'
  | 'gu'
  | 'ht'
  | 'ha'
  | 'he'
  | 'hz'
  | 'hi'
  | 'ho'
  | 'hu'
  | 'is'
  | 'io'
  | 'ig'
  | 'id'
  | 'ia'
  | 'ie'
  | 'iu'
  | 'ik'
  | 'ga'
  | 'it'
  | 'ja'
  | 'jv'
  | 'kn'
  | 'kr'
  | 'ks'
  | 'kk'
  | 'km'
  | 'ki'
  | 'rw'
  | 'ky'
  | 'kv'
  | 'kg'
  | 'ko'
  | 'kj'
  | 'ku'
  | 'lo'
  | 'la'
  | 'lv'
  | 'li'
  | 'ln'
  | 'lt'
  | 'lu'
  | 'lb'
  | 'mk'
  | 'mg'
  | 'ms'
  | 'ml'
  | 'mt'
  | 'gv'
  | 'mi'
  | 'mr'
  | 'mh'
  | 'mn'
  | 'na'
  | 'nv'
  | 'nd'
  | 'nr'
  | 'ng'
  | 'ne'
  | 'no'
  | 'nb'
  | 'nn'
  | 'ii'
  | 'oc'
  | 'oj'
  | 'or'
  | 'om'
  | 'os'
  | 'pi'
  | 'ps'
  | 'fa'
  | 'pl'
  | 'pt'
  | 'pa'
  | 'qu'
  | 'ro'
  | 'rm'
  | 'rn'
  | 'ru'
  | 'se'
  | 'sm'
  | 'sg'
  | 'sa'
  | 'sc'
  | 'sr'
  | 'sn'
  | 'sd'
  | 'si'
  | 'sk'
  | 'sl'
  | 'so'
  | 'st'
  | 'es'
  | 'su'
  | 'sw'
  | 'ss'
  | 'sv'
  | 'tl'
  | 'ty'
  | 'tg'
  | 'ta'
  | 'tt'
  | 'te'
  | 'th'
  | 'bo'
  | 'ti'
  | 'to'
  | 'ts'
  | 'tn'
  | 'tr'
  | 'tk'
  | 'tw'
  | 'ug'
  | 'uk'
  | 'ur'
  | 'uz'
  | 've'
  | 'vi'
  | 'vo'
  | 'wa'
  | 'cy'
  | 'wo'
  | 'xh'
  | 'yi'
  | 'yo'
  | 'za'
  | 'zu'
