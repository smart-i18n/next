import type {I18nContext} from '../models'
import {resolveServerI18n} from './utils'
import LocaleParam = I18n.LocaleParam

const i18n = async (localeParam?: LocaleParam) => resolveServerI18n(localeParam)
export default i18n satisfies () => PromiseLike<I18nContext>
