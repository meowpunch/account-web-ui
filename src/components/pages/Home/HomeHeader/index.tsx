import {Avatar, Container, IconButton} from "@material-ui/core";
import React from "react";

import useStyles from "./styles";
import {Account} from "../../../../context/AccountData";

type Props = {
    account: Account
}


const Index: React.FC<Props> = (props: Props) => {

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <IconButton className={classes.avatarButton}>
                <Avatar alt="Remy Sharp" src={props.account.cached.picture} className={classes.avatar}/>
            </IconButton>

            <p>{props.account.cached.nick}님, 환영합니다</p>
        </Container>
    )
}

export default Index