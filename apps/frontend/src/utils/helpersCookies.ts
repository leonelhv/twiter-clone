import Cookies from "universal-cookie";
const cookies = new Cookies()

export function saveCookies<T> (key: string, value: T) {

  cookies.set(key, value, { path: '/' });

}

export function getCookieByString<T> (key: string): T | null {

  const value = cookies.get<T>(key)
  if (value) {
    return value;
  }
  return null

}

export function removeCookieByString (key: string) {
  cookies.remove(key, { path: '/' });

}