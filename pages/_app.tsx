import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { UIProvider } from '../context/ui'
import { EntriesProvider } from '../context/entries';

import { darkTheme, lightTheme } from '../themes'
import { ClientesProvider } from '../context/clientes';

export default function App({ Component, pageProps }: AppProps) {
  return (
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
    
    )
}
