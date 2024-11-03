import {headers} from 'next/headers'
import type {NextRequest} from 'next/server'
import {LOCALE_PARAMS} from './config'
import {extractLocaleParamFromPathname} from './utils'
import LocaleParam = I18n.LocaleParam

export function handleRequest(request: NextRequest) {
  const {pathname} = request.nextUrl

  const localeParamCandidate = extractLocaleParamFromPathname(pathname)
  if (!LOCALE_PARAMS.includes(localeParamCandidate)) return {invalidLocaleParam: true}

  const localeParam = localeParamCandidate as LocaleParam
  const localeFreePathname = pathname.slice(1 /* "/" */ + localeParam.length)

  const reqHeaders = new Headers(request.headers)
  reqHeaders.set('x-locale-param', localeParam)
  reqHeaders.set('x-locale-free-pathname', localeFreePathname || '/')
  reqHeaders.set('x-pathname', pathname)
  return {extendedHeaders: reqHeaders}
}

export const isRequestHandledByMiddleware = async () => (await headers()).has('x-locale-param')
