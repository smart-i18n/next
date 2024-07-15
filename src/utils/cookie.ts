import LocaleParam = I18n.LocaleParam

export const cookies = new Proxy(
  {},
  {
    get(_, cookieName: string): string | undefined {
      return document.cookie
        .split(';')
        .find((cookie) => cookie.trimStart().startsWith(`${cookieName}=`))
        ?.split('=')[1]
        ?.trim()
    },
    set(_, cookieName: string, value: string): boolean {
      document.cookie = `${cookieName}=${value};path=/`
      return true
    },
    deleteProperty(_, cookieName: string): boolean {
      document.cookie = `${cookieName}=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;`
      return true
    },
  },
) as Cookies

type Cookies = {colorScheme?: 'light' | 'dark'; localeParam?: LocaleParam}
