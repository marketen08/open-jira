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
import { AuthContext, ChatContext } from "../../../context";
import { SidebarChatItem } from "../../chats";

export const ChatBar = () => {

  const { chatmenuOpen, closeChatMenu } = useContext( UIContext)
  const { user, isLoggedIn, logout } = useContext(  AuthContext );

  const { usuarios } = useContext( ChatContext );

  return (
          <Drawer
            anchor='right'
            open={ chatmenuOpen }
            onClose={ () => closeChatMenu() }
            
          >
            <Box sx={{ width: 350 }}></Box>
            <Box sx={{ padding: '5px 5px' }} >
                <Typography variant='h4' sx={{ pl: 2, pt: 2 }}>Chat</Typography>
            </Box>

            <List sx={{ width: '100%', padding: 1 }}>
              {
                  usuarios
                      .filter( us => us.uid !== user?.uid )
                      .map( ( usuario ) => (
                      <SidebarChatItem
                          key={ usuario.uid }
                          usuario={ usuario }
                      />
                  ))
              }
          </List>

            <Divider />
          </Drawer>
    )
}