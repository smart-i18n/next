import {createContext} from 'react'
import type {I18nContext} from '../models'
import LocaleParam = I18n.LocaleParam

export const I18nCtx = createContext<I18nContext>({} as never)
const i18n = (localeParam?: LocaleParam) => {
  if (localeParam !== undefined)
    throw new Error(
      "Client components don't accept `localeParam` arg. They resolve it themselves.\n" +
        'The `localeParam` arg in the type of client-side `i18n()` is just for the consistency with server-side `i18n()`.',
    )
  return I18nCtx
}
export default i18n
