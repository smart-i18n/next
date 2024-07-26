'use client'
import {usePathname as useNxPathname} from 'next/navigation'
import {use} from 'react'
import i18n from './'

export default function usePathname() {
  return useNxPathname().replace(new RegExp(`^/${use(i18n).localeParam}(?:/|$)`), '/')
}
