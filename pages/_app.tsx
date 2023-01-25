import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider, ChatProvider, ClientesProvider, EntriesProvider, PedidosProvider, UIProvider, VehiculosProvider } from '../context'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'

import { darkTheme, lightTheme } from '../themes'
import { SWRConfig } from 'swr'
import { SocketProvider } from '../context/socket/SocketContextOriginal'

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
        <ChatProvider>
          <AuthProvider>
            <SocketProvider>
              <SnackbarProvider maxSnack={ 3 }>
                <UIProvider>
                  <PedidosProvider>
                    <VehiculosProvider>
                      <EntriesProvider>
                        <ClientesProvider>
                          <ThemeProvider theme={ darkTheme }>
                            <CssBaseline />
                            <Component {...pageProps} />
                          </ThemeProvider>
                        </ClientesProvider>
                      </EntriesProvider>
                    </VehiculosProvider>
                  </PedidosProvider>
                </UIProvider>
              </SnackbarProvider>
            </SocketProvider>
          </AuthProvider>
        </ChatProvider>
      </SWRConfig>
    </SessionProvider>
    )
}
