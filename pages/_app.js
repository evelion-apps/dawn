import 'tailwindcss/tailwind.css'
import '../assets/main.css'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        onError: (error) => { console.log("Error: ", error) },
        onSuccess: (data) => { console.log(data) },
        shouldRetryOnError: false,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
