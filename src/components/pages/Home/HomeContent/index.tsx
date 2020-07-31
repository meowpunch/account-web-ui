import {Avatar, Card, Container, Grid, CardMedia, CardHeader, CardContent} from "@material-ui/core";
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
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            프로필 정보
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            나의 포인트
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            내가 쓴 글
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}    >
                            스크랩한 글
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Container>
    )
}

export default Index