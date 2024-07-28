import i18n from '@smart-i18n/next'
import NxLink from 'next/link'
import {use} from 'react'
import LocaleParam = I18n.LocaleParam

export default function Link({
  href,
  locale: localeParam,
  ...props
}: Parameters<typeof NxLink>[0] & {locale?: LocaleParam}) {
  return (
    <NxLink
      {...props}
      href={(href as string).startsWith('/') ? `/${localeParam ?? use(i18n()).localeParam}` + href : href}
    />
  )
}
