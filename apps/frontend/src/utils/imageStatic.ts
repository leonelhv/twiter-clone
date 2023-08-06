export const imageStatic = (path: string) => {

  const newBaseUrl = (import.meta.env.VITE_API_ASSETS_URL as string).replace(/\/$/, '')

  return `${newBaseUrl}/${path}`
}



