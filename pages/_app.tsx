import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider, ClientesProvider, EntriesProvider, UIProvider } from '../context'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'

import { darkTheme, lightTheme } from '../themes'
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig 
          value={{
            // La siguiente linea es para actualizar la información desde el backend 
            // en el intervalo de tiempo especificado en milisegundos.
            // refreshInterval: 500,
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
      <AuthProvider>
        <SnackbarProvider maxSnack={ 3 }>
          <EntriesProvider>
            <UIProvider>
              <ClientesProvider>
                <ThemeProvider theme={ darkTheme }>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </ClientesProvider>
            </UIProvider>
          </EntriesProvider>
        </SnackbarProvider>
      </AuthProvider>
      </SWRConfig>
    </SessionProvider>
    )
}
