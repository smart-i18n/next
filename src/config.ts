import config from '@smart-i18n/next/i18n-config' // Imports consumer's `config` file
import type {Config} from './models'
import LocaleParam = I18n.LocaleParam
import BaseLocaleCode = I18n.BaseLocaleCode

export default config as Config // TODO: With `declare module '@smart-i18n/next/i18n-config' {}` in `consumer-config.d.ts`, what need for `as config`?

export const {I18N_MODEL, LANGUAGES, LOCALE_CODES} = config as Config
export const LOCALE_PARAMS: readonly LocaleParam[] = (config as Config).LOCALE_PARAMS // TypeScript automatically infers the type of `config.LOCALE_PARAMS` as `readonly Lang[]`!
export const DEFAULT_LOCALE_PARAM: LocaleParam = (config as Config).DEFAULT_LOCALE_PARAM // TypeScript automatically infers the type of `config.DEFAULT_LOCALE_PARAM` as `Lang`!
export const BASE_LOCALE_CODE: BaseLocaleCode = (config as Config).BASE_LOCALE_CODE // TypeScript automatically infers the type of `config.BASE_LOCALE_CODE` as `"en"`!
