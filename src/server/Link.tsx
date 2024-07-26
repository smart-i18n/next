import NxLink from 'next/link'
import {resolveServerI18n} from './utils'
import LocaleParam = I18n.LocaleParam

export default function Link({
  href,
  locale: localeParam,
  ...props
}: Parameters<typeof NxLink>[0] & {locale?: LocaleParam}) {
  return (
    <NxLink
      {...props}
      href={(href as string).startsWith('/') ? `/${localeParam ?? resolveServerI18n().localeParam}` + href : href}
    />
  )
}
