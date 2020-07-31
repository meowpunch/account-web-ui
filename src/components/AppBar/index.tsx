import React, {useContext} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Switch } from 'react-router';

import Home from "../pages/Home"
import About from "../pages/About"



import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountDataContext, {Account} from "../../context/AccountData";
import useStyles from "./styles";

import HomeIcon from "@material-ui/icons/Home"


type Props = {
}

const Index: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    const state = useContext(AccountDataContext);

    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {   
        setOpen(false);
    };

    return (
        <div>
            <AppBar position="static" style={{ background: "#474747", fontSize: 10 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {/* 마이 페이지 */}
          </Typography>


                    <Button color="inherit"
                        className={classes.menuButton}>{state.account.cached.username}님</Button>
                    <Button color="inherit" 
                        className={classes.menuButton}>{state.account.userPoint} points</Button>
                    <Button color="inherit" 
                        className={classes.menuButton}>My page</Button>
                    <Button color="inherit" 
                        className={classes.menuButton}>로그아웃</Button>
                </Toolbar>

            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >

                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider/>

                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon></HomeIcon>
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/myaccount/">홈</Link>
                        </ListItemText>
                    </ListItem>
                </List>
                <List>
                    <ListItem button>
                        <ListItemText>
                            <Link to="/myaccount/about">프로필 정보</Link>
                        </ListItemText>
                    </ListItem>
                </List>
                <List>
                    <ListItem button>
                        <ListItemText>
                            <Link to="/myaccount/about">나의 포인트</Link>
                        </ListItemText>
                    </ListItem>
                </List><List>
                <ListItem button>
                    <ListItemText>
                        <Link to="/myaccount/about">내가 쓴글</Link>
                    </ListItemText>
                </ListItem>
            </List><List>
                <ListItem button>
                    <ListItemText>
                        <Link to="/myaccount/about">프로필 정보</Link>
                    </ListItemText>
                </ListItem>
            </List>



            </Drawer>

        </div>
    );
}

export default Index;