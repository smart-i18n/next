import LocaleCode = I18n.LocaleCode
import Dict = I18n.Dict
import Translatable = I18n.Translatable

const TEMPLATE_PATTERN = /\{\{([1-9]\d*)}}/

export function createTranslator(localeCode: LocaleCode, dict: Dict): Translator {
  const t: TranslatorFunction = (textOrStrings, ...values) => {
    // noinspection SuspiciousTypeOfGuard
    if (!(textOrStrings instanceof Array)) return dict[textOrStrings]

    // for (const str of textOrStrings)
    //   if (TEMPLATE_PATTERN.test(str))
    //     throw Error(`Strings should not include TEMPLATE_PATTERN (${TEMPLATE_PATTERN}). Invalid one is: "${str}"`)

    const template = textOrStrings.reduce((template, str, i) => template + `{{${i}}}` + str)
    const translatedTemplate =
      template === '{{1}}' // An edge case when: t`${...}`!
        ? template
        : dict[template as Translatable]!

    const translatedSections: string[] = []
    let i = 0
    const valuesInTranslatedTemplate: unknown[] = []
    for (const match of translatedTemplate.matchAll(new RegExp(TEMPLATE_PATTERN, 'g'))) {
      translatedSections.push(translatedTemplate.slice(i, match.index))
      i = match.index! + match[0].length
      valuesInTranslatedTemplate.push(values[+match[1]! - 1])
    }
    translatedSections.push(translatedTemplate.slice(i))
    return translatedSections.reduce((result, translatedSection, i) => {
      const valueOrValueWithOptions = valuesInTranslatedTemplate[i - 1]
      const [value, options] =
        valueOrValueWithOptions instanceof Array ? valueOrValueWithOptions : [valueOrValueWithOptions, {}]
      return result + transformValue(value, options) + translatedSection
    })
  }
  return new Proxy(t, {
    get(_, text: Translatable): string {
      return dict[text]
    },
  }) as Translator

  function transformValue(value: string): string
  function transformValue(value: number, options: Intl.NumberFormatOptions): string
  function transformValue(value: Date, options: Intl.DateTimeFormatOptions): string
  function transformValue(value: string | number | Date, options?: object): string {
    const dictElement = dict[value as Translatable]
    return typeof value === 'number'
      ? new Intl.NumberFormat(localeCode, options).format(value)
      : value instanceof Date
        ? new Intl.DateTimeFormat(localeCode, options as Intl.DateTimeFormatOptions).format(value)
        : dictElement
  }
}

interface TranslatorFunction {
  (text: Translatable): string
  (strings: TemplateStringsArray, ...values: unknown[]): string
}
export type Translator = TranslatorFunction & Dict

// export const isTranslatable = (text: string, dictionary: Dict | Dictionary): text is Translatable => text in dictionary
