import i18n from '@smart-i18n/next'
import {usePathname as useNxPathname} from 'next/navigation'
import {use} from 'react'

export default function usePathname() {
  return useNxPathname().replace(new RegExp(`^/${use(i18n()).localeParam}(?:/|$)`), '/')
}
