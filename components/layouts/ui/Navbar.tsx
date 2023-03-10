import { AppBar, IconButton, Link, Menu, MenuItem, Toolbar } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Typography from "@mui/material/Typography";
import { useContext, useState } from 'react';
import { UIContext } from "../../../context/ui";
import NextLink from "next/link";
import { AccountCircle, EmailOutlined } from "@mui/icons-material";

export const Navbar = () => {

  const { openSideMenu } = useContext( UIContext )

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <AppBar position='sticky'>
        <Toolbar>
            <IconButton
                size='large'
                edge='start'
                onClick={ openSideMenu }
                color='inherit'
            >
                <MenuOutlinedIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <NextLink
                href='/'
                passHref
                legacyBehavior
              >
                <Link underline='none' color='white'>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Administración de presupuestos</Typography>
                </Link>
              </NextLink>
            </Typography>
            {true && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                // aria-controls="menu-appbar"
                // aria-haspopup="true"
                // onClick={handleMenu}
                color="inherit"
              >
                <EmailOutlined />
              </IconButton>
              
            </div>
          )}
          {true && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Chat</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
    </AppBar>
  )
}
