import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import Logo from "../files/images/logo.png"

const heading = "Signal and Telecom Monitoring System"

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  appBar: {
    // alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    marginLeft:"85px"
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center"
  },
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const items = [
    {
      id: 1,
      name: 'Home',
      link: '/',
      icon: <HomeIcon/>
    },
    {
      id: 2,
      name: 'Signal',
      link: '/signal',
      icon: <StoreIcon/>
    },
    {
      id: 2,
      name: 'Telecom',
      link: '/telecom',
      icon: <StoreIcon/>
    }
]

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <div className={classes.toolbar} >
        <div className={classes.image}>
        <img src={Logo} alt="Logo" height="60px" width="60px"/>
        </div>
    </div>
      <Divider />
      <List>
        {items.map((item, index) => (
          <ListItem button key={index} component="a" href={item.link}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <Divider/>
    </div>
  );

  return (
    <div>
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton onClick={toggleDrawer("left", true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {heading}
                </Typography>
            </Toolbar>
        </AppBar>
        <React.Fragment key="left">
          <Drawer anchor="left" open={state["left"]} onClose={toggleDrawer("left", false)}>
            {list("left")}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
