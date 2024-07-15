'use client'
import NxLink from 'next/link'
import useI18n from './useI18n'
import LocaleParam = I18n.LocaleParam

export default function Link({
  href,
  locale: localeParam,
  ...props
}: Parameters<typeof NxLink>[0] & {locale?: LocaleParam}) {
  const {localeParam: currentLocaleParam} = useI18n()
  return (
    <NxLink
      {...props}
      href={(href as string).startsWith('/') ? `/${localeParam ?? currentLocaleParam}` + href : href}
    />
  )
}
