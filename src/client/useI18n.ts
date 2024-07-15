'use client'
import {use} from 'react'
import {I18nContext} from './I18nProvider'

export default function useI18n() {
  const i18nContext = use(I18nContext)
  if (!i18nContext.localeParam) throw new Error('It seems you used `useI18n()` outside of `I18nProvider`!')
  return i18nContext
}
