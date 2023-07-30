export const imageStatic = (path: string) => {
  return `${import.meta.env.VITE_APP_STATIC_URL as string}/${path}`
}