import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                marginTop: theme.spacing(3),
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            },
            avatar: {
                width: theme.spacing(12),
                height: theme.spacing(12),
            },
            avatarButton: {
                margin: theme.spacing(2),
                padding: theme.spacing(0.1),
                border: '1px solid #dadce0'
            }
        }),
    )
;

export default useStyles;