import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
                '& > *': {
                    margin: theme.spacing(1),
                },
            },
            container: {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            },
            content: {
                height: '100%',
                border: '1px solid black',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            small: {
                width: theme.spacing(3),
                height: theme.spacing(3),
            }
        }),
    )
;

export default useStyles;