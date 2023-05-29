import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AdjuntosProvider, AuthProvider, ChatProvider, ClientesProvider, EntriesProvider, PedidosProvider, UIProvider, VehiculosProvider } from '../context'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'

import { darkTheme, lightTheme } from '../themes'
import { SWRConfig } from 'swr'
import { SocketProvider } from '../context/socket'

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
              <SnackbarProvider maxSnack={ 3 }>
                  <ClientesProvider>
            <SocketProvider>
                <UIProvider>
                    <PedidosProvider>
                      <AdjuntosProvider>
                        <VehiculosProvider>
                          <EntriesProvider>
                            
                              <ThemeProvider theme={ lightTheme }>
                                <CssBaseline />
                                <Component {...pageProps} />
                              </ThemeProvider>
                          </EntriesProvider>
                        </VehiculosProvider>
                      </AdjuntosProvider>
                    </PedidosProvider>
                </UIProvider>
            </SocketProvider>
                  </ClientesProvider>
              </SnackbarProvider>
          </AuthProvider>
        </ChatProvider>
      </SWRConfig>
    </SessionProvider>
    )
}
