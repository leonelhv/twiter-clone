export const imageStatic = (path: string) => {
   
    const newBaseUrl= (import.meta.env.VITE_APP_STATIC_URL as string).replace(/\/$/, '')
 
  return `${newBaseUrl}/${path}`
}



