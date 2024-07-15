// @ts-expect-error
import theConfig from '@smart-i18n/next/i18n-config' // Imports consumer's `config` file
import type {Config} from './models'
import LocaleParam = I18n.LocaleParam

const config = theConfig as Config

export default config
export const {I18N_MODEL, BASE_LOCALE_CODE, DEFAULT_LOCALE_PARAM, LANGUAGES, LOCALE_CODES} = config
export const LOCALE_PARAMS = config.LOCALE_PARAMS as readonly LocaleParam[] // TypeScript automatically infers the type of `config.LOCALE_PARAMS` as `readonly Lang[]`!
