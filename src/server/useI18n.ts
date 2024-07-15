import 'server-only'
import {I18nContext} from '../models'
import {createServerI18n, getLocaleParam} from './index'

export default function useI18n(): I18nContext {
  return createServerI18n(getLocaleParam())
}
