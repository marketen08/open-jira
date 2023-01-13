import { useContext } from "react";
import { Box, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"

import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { UIContext } from "../../../context/ui";

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const SideBar = () => {

  const { sidemenuOpen, closeSideMenu } = useContext( UIContext)


  return (
          <Drawer
            anchor='left'
            open={ sidemenuOpen }
            onClose={ () => closeSideMenu() }
          >
            <Box sx={{ width: 250 }}></Box>
            <Box sx={{ padding: '5px 5px' }} >
                <Typography variant='h4'>Menú</Typography>
            </Box>

            <List>
              {
                menuItems.map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      { index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
                    </ListItemIcon>
                    <ListItemText primary={ text } />
                  </ListItem>
                ))
              }
            </List>

            <Divider />
          </Drawer>
    )
}
