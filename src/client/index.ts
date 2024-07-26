import {createContext} from 'react'
import type {I18nContext} from '../models'

const i18n = createContext<I18nContext>({} as never)
export default i18n
