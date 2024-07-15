'use client'
import {usePathname as useNxPathname} from 'next/navigation'
import useI18n from './useI18n'

export default function usePathname() {
  const {localeParam} = useI18n()
  return useNxPathname().replace(new RegExp(`^/${localeParam}(?:/|$)`), '/')
}
