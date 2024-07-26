'use client'
import NxLink from 'next/link'
import {use} from 'react'
import i18n from '.'
import LocaleParam = I18n.LocaleParam

export default function Link({
  href,
  locale: localeParam,
  ...props
}: Parameters<typeof NxLink>[0] & {locale?: LocaleParam}) {
  return (
    <NxLink
      {...props}
      href={(href as string).startsWith('/') ? `/${localeParam ?? use(i18n).localeParam}` + href : href}
    />
  )
}
