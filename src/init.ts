import Dictionary = I18n.Dictionary
import LocaleParam = I18n.LocaleParam
import LocaleCode = I18n.LocaleCode
import Lang = I18n.Lang
import BaseLocaleCode = I18n.BaseLocaleCode
import type {Config, I18nModel} from './models'

// noinspection JSUnusedGlobalSymbols
/**
 * @param {object} options
 * @param options.I18N_MODEL
 * @param options.BASE_LOCALE_CODE The language/locale-code in which the keys of dictionaries are provided. So doesn't
 *   need translation.
 * @param options.DEFAULT_LOCALE_PARAM To navigate if no explicit local-param entered by the user and no other way to
 *   recover/infer it.
 * @param options.dictionary
 * @param [options.getLocaleParams]
 */
export function createConfig({
  I18N_MODEL: I18N_MODEL_ARG,
  BASE_LOCALE_CODE: BASE_LOCALE_CODE_ARG,
  DEFAULT_LOCALE_PARAM: DEFAULT_LOCALE_PARAM_ARG,
  dictionary: DICTIONARY_ARG,
  getLocaleParams = (LANGUAGES) => LANGUAGES,
}: {
  I18N_MODEL: I18nModel
  BASE_LOCALE_CODE: BaseLocaleCode
  DEFAULT_LOCALE_PARAM: LocaleParam
  dictionary: Dictionary
  getLocaleParams?: (LANGUAGES: readonly Lang[], LOCALE_CODES: readonly LocaleCode[]) => readonly LocaleParam[]
}): Config {
  const I18N_MODEL = I18N_MODEL_ARG
  const BASE_LOCALE_CODE = BASE_LOCALE_CODE_ARG
  const DEFAULT_LOCALE_PARAM = DEFAULT_LOCALE_PARAM_ARG
  const dictionary = DICTIONARY_ARG
  const LANGUAGES = Object.keys(I18N_MODEL) as Lang[]
  const LOCALE_CODES = Object.values(I18N_MODEL).flatMap(({localeCodes}) => localeCodes)
  const LOCALE_PARAMS = getLocaleParams(LANGUAGES, LOCALE_CODES)
  // const LOCALES = Object.fromEntries(
  //   Object.values(I18N_MODEL).flatMap(({localeCodes}) =>
  //     localeCodes.map((localeCode) => [localeCode, new Locale(localeCode)] as const),
  //   ),
  // ) as {[key in LocaleCode]: Locale}
  return {
    I18N_MODEL,
    BASE_LOCALE_CODE,
    DEFAULT_LOCALE_PARAM,
    dictionary,
    LANGUAGES,
    LOCALE_CODES,
    LOCALE_PARAMS,
  }
}
