import i18n from '@smart-i18n/next'
import {type ReactNode, use} from 'react'
import Translatable = I18n.Translatable

export default async function T({children}: {children: NonNullable<ReactNode> | NonNullable<ReactNode>[]}) {
  const {dict} = use(i18n())
  const html = typeof children === 'string' ? children : await renderToStaticMarkup(children)
  const translatedHtml = dict[html as Translatable] as TrustedHTML
  return <span dangerouslySetInnerHTML={{__html: translatedHtml}} />
  // Unfortunately not possible: `return <React.Fragment dangerouslySetInnerHTML={{__html: translatedHtml}}></React.Fragment>`
  // See: https://github.com/facebook/react/issues/12014 & https://github.com/reactjs/rfcs/pull/129
  // & https://stackoverflow.com/questions/48236588/using-fragment-to-insert-html-rendered-on-the-back-end-via-dangerouslysetinnerht
  // & https://www.npmjs.com/package/html-react-parser & https://packagephobia.com/result?p=html-react-parser
}

type Children = NonNullable<ReactNode> | NonNullable<ReactNode>[]

/**
 * TODO: Use top-level `await` when it was stable in Webpack:
 * https://webpack.js.org/configuration/experiments/#experimentstoplevelawait
 * @see https://github.com/vercel/next.js/issues/43810#issuecomment-1341136525
 */
const renderToStaticMarkup = async (component: Children) =>
  (await import('react-dom/server')).default.renderToStaticMarkup(component)
