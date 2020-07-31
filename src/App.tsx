import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Switch} from 'react-router';
import './App.css';

import About from "./components/pages/About";

import MainBar from "./components/AppBar";


import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';


import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';

import HomeHandler from './components/pages/Home/context';
import Home from './components/pages/Home'
import AccountDataContext from "./context/AccountData";
import {CircularProgress, Container, Divider, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        appLoading: {
            margin: theme.spacing(3)
        }

    }),
);


const App: React.FC = () => {
    const classes = useStyles();

    const state = useContext(AccountDataContext);

    useEffect(() => {
        state.setAccount()
    }, [state.setAccount]);

    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };


    if (state.account.cached.userId == -1) {
        return (
            <Container className="App">
                <CircularProgress color="primary" className={classes.appLoading}/>
                <p>계정 정보를 불러오고 있습니다</p>
            </Container>
        )
    } else {
        return (
            <Router>
                <div className="App">
                    <MainBar></MainBar>

                    <Switch>
                        <Route exact={true} path={'/myaccount/'} component={Home}/>
                        <Route exact={true} path={'/myaccount/about'} component={About}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
