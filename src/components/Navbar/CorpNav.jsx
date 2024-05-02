import {useState} from 'react';
import {NavLink, Link, useNavigate} from 'react-router-dom';
import {useUser} from '../../hooks/useUser';
//MUI Imports
import {styled, useTheme} from '@mui/material/styles';
import {
  Box,
  Button,
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: prop => prop !== 'open'})(({theme, open}) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({theme, open}) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function CorpNav() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const {user, logout} = useUser();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfile = () => {
    if (profileOpen) {
      setProfileOpen(!profileOpen);
      navigate('/corp');
    } else {
      setProfileOpen(!profileOpen);
      navigate('/profile');
    }
  };

  return (
    <Box sx={{display: 'flex'}}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{mr: 2, ...(open && {display: 'none'})}}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Your Recruitment Dashboard
          </Typography>
          <div style={{flexGrow: 1}} /> {/* Add a spacer to push the account icon to the end */}
          {user.type && (
            <IconButton sx={{m: 1, bgcolor: 'footer.text'}} onClick={handleProfile}>
              <AccountCircleIcon sx={{color: 'primary', fontSize: '2rem', border: 'none'}} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {title: 'Create Role', icon: 'AddTaskIcon', link: '/new-role'},
            {title: 'Manage Roles', icon: 'ConnectWithoutContactIcon', link: '/new-role'},
            {title: 'User Admin', icon: 'ConnectWithoutContactIcon', link: '/new-role'},
            {title: 'Account Admin', icon: 'ConnectWithoutContactIcon', link: '/new-role'},
          ].map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(item.link)}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem>
            <ListItemButton onClick={logout}>
              <ListItemText>LOGOUT</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph></Typography>
      </Main>
    </Box>
  );
}
