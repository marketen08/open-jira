import { AppBar, IconButton, Link, Toolbar } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Typography from "@mui/material/Typography";
import { useContext } from 'react';
import { UIContext } from "../../../context/ui";
import NextLink from "next/link";

export const Navbar = () => {

  const { openSideMenu } = useContext( UIContext )

  return (
    <AppBar position='sticky'>
        <Toolbar>
            <IconButton
                size='large'
                edge='start'
                onClick={ openSideMenu }
            >
                <MenuOutlinedIcon />
            </IconButton>

            <NextLink
              href='/'
              passHref
              legacyBehavior
            >
              <Link underline='none' color='white'>
                <Typography variant='h6'>Administración de presupuestos</Typography>
              </Link>
            </NextLink>
        </Toolbar>
    </AppBar>
  )
}
