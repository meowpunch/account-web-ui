import React, {Component, useEffect, useState, useContext} from "react";

import {Container, Avatar, CircularProgress} from "@material-ui/core";
import useStyles from "./styles";

import AccountDataContext, {Account, initialAccountData} from "../../../context/AccountData";
import HomeHeader from "./HomeHeader"
import HomeContent from "./HomeContent"

type Props = {}

const Index: React.FC<Props> = (props: Props) => {

    const state = useContext(AccountDataContext);
    // const [isLoading, setIsLoading] = useState(false);

    const classes = useStyles();

    return (
        <main className={classes.content}>

                <Container className={classes.container}>
                    <HomeHeader account={state.account}/>
                    <HomeContent account={state.account}/>
                </Container>

        </main>
    )
}

export default Index;