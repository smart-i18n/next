import type {AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes} from 'react'
import type Locale from './Locale'
import type {Translator} from './translator'
import Dictionary = I18n.Dictionary
import LocaleParam = I18n.LocaleParam
import LocaleCode = I18n.LocaleCode
import Lang = I18n.Lang
import Dict = I18n.Dict
import BaseLocaleCode = I18n.BaseLocaleCode

export type Config = {
  I18N_MODEL: I18nModel
  BASE_LOCALE_CODE: BaseLocaleCode
  DEFAULT_LOCALE_PARAM: LocaleParam
  dictionary: Dictionary
  LANGUAGES: readonly Lang[]
  LOCALE_CODES: readonly LocaleCode[]
  LOCALE_PARAMS: readonly LocaleParam[]
}

export type I18nModel = {
  [key in Lang]: {
    /**
     * Put default locale-code of this language/localeParam ("fa") as the first item of the array. That will be set as
     * locale-code if an alone language-code found in URL ("fa" localeParam => "fa-IR" localeCode). See the
     * instantiations of `Locale` class.
     */
    localeCodes: readonly LocaleCode[]
    name: string
    label: string
  }
}

export type I18nContext = {
  locale: Locale
  localeParam: LocaleParam
  dict: Dict
  t: Translator
}
export type TranslatableHtmlTags = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'a' | 'button'
export type Attributes<T extends TranslatableHtmlTags> = T extends 'p'
  ? HTMLAttributes<HTMLParagraphElement>
  : T extends 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    ? HTMLAttributes<HTMLHeadingElement>
    : T extends 'a'
      ? AnchorHTMLAttributes<HTMLAnchorElement>
      : T extends 'button'
        ? ButtonHTMLAttributes<HTMLButtonElement>
        : T extends 'span'
          ? HTMLAttributes<HTMLSpanElement>
          : never
