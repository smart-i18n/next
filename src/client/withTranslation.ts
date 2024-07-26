'use client'
import NxLink from 'next/link'
import {Children, createElement, FC, isValidElement, use} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import i18n from '.'
import type {Attributes, TranslatableHtmlTags} from '../models'
import Link from './Link'
import Translatable = I18n.Translatable

export const A = withTranslation('a')
export const H1 = withTranslation('h1')
export const H2 = withTranslation('h2')
export const H3 = withTranslation('h3')
export const H4 = withTranslation('h4')
export const H5 = withTranslation('h5')
export const H6 = withTranslation('h6')
export const P = withTranslation('p')
export const Span = withTranslation('span')
export const Button = withTranslation('button')

export const TLink = withTranslation(Link)

/**
 * External-Anchor with translation.
 *
 * This (addition to auto-translation) adds **`target="_blank"`** and **`rel="noopener noreferrer nofollow"`** that is
 * suitable for external links.
 */
export const AX = withTranslation('a', {rel: 'noopener noreferrer nofollow', target: '_blank'})
/**
 * External-Link with translation.
 *
 * This (addition to auto-translation) adds **`target="_blank"`** and **`rel="noopener noreferrer nofollow"`** that is
 * suitable for external links.
 */
export const TLinkX = withTranslation(NxLink, {rel: 'noopener noreferrer nofollow'})

function withTranslation<P>(Component: FC<P>, defProps?: Partial<P>): FC<P>
function withTranslation<T extends TranslatableHtmlTags>(htmlElement: T, defProps?: Attributes<T>): FC<Attributes<T>>
function withTranslation(htmlElementOrComponent: TranslatableHtmlTags | FC, defProps: object = {}): FC {
  return function WithTranslation({children, ...props}: {children?: unknown}) {
    const {dict} = use(i18n)
    return createElement(htmlElementOrComponent, {
      ...defProps,
      ...props, // @ts-expect-error // TODO: Try to fix this error
      dangerouslySetInnerHTML: children
        ? {
            __html:
              dict[
                Children.map(children, (child) => (isValidElement(child) ? renderToStaticMarkup(child) : child)).join(
                  '',
                ) as Translatable
              ],
          }
        : undefined,
    })
  }
}
export default withTranslation
