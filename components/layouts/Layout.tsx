import { FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material'
import Head from 'next/head'
import { Navbar, SideBar } from './ui';

interface Props {
    children: ReactNode;
    title?: string;
}
export const Layout:FC<Props> = ({ title = 'Gestión de servicios', children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
        <Head>
            <title>{ title }</title>
        </Head>

        <Navbar />
        <SideBar />

        <Box sx={{ padding: '10px 20px' }}>
            { children }
        </Box>
    </Box>
  )
}
