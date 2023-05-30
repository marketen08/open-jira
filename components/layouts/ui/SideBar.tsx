import { useContext } from "react";
import { Box, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { UIContext } from "../../../context/ui";
import NextLink from "next/link";
import Button from "@mui/material/Button";
import { LoginOutlined } from "@mui/icons-material";
import { AuthContext } from "../../../context";

type menuItem = {
  titulo: string,
  url: string,
  icono?: any
}

const menuItems: menuItem[] = [
  {
    titulo: 'INICIO',
    url: '/',
    icono: <HomeOutlinedIcon />
  },
  {
    titulo: 'INGRESO',
    url: '/ingreso',
    icono: <SummarizeOutlinedIcon />
  },
  {
    titulo: 'PEDIDOS',
    url: '/pedidos',
    icono: <FolderCopyOutlinedIcon />
  },
  {
    titulo: 'VEHÍCULOS',
    url: '/vehiculos',
    icono: <FolderCopyOutlinedIcon />
  },
  {
    titulo: 'CLIENTES',
    url: '/clientes',
    icono: <FolderCopyOutlinedIcon />
  }
]

export const SideBar = () => {

  const { sidemenuOpen, closeSideMenu } = useContext( UIContext)
  const { user, isLoggedIn, logout } = useContext(  AuthContext );

  return (
          <Drawer
            anchor='left'
            open={ sidemenuOpen }
            onClose={ () => closeSideMenu() }
          
            
          >
            <Box sx={{ width: 250 }}></Box>
            <Box sx={{ padding: '5px 5px' }} >
                <Typography variant='h4' sx={{ pl: 2, pt: 2 }}>Menú</Typography>
            </Box>

            <List>
              {
                menuItems.map(( item, index) => (
                  <NextLink
                    href={ item.url }
                    passHref
                    legacyBehavior
                    key={ item.titulo }
                  >
                    <ListItemButton component='a' onClick={ closeSideMenu }>
                      <ListItemIcon>
                        { item.icono }
                      </ListItemIcon>
                      <ListItemText primary={ item.titulo } />
                    </ListItemButton>
                  </NextLink>
                ))
              }
              <ListItemButton component='a' onClick={ logout }>
                <ListItemIcon>
                  <LoginOutlined />
                </ListItemIcon>
                <ListItemText primary='Salir' />
              </ListItemButton>
            </List>

            <Divider />
          </Drawer>
    )
}
