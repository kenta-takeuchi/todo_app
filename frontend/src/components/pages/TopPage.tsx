import React from "react";
import {
    Grid,
    makeStyles,
    createMuiTheme,
    MuiThemeProvider,
    Theme, Button
} from "@material-ui/core";

import styles from "./css/top.module.css"
import TaskList from "../../features/task/TaskList";

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: "#3cb371",
        },
    },
});

const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        marginTop: theme.spacing(3),
        cursor: "none",
    },
}));


export const Top: React.FC = () => {
    const classes = useStyles();

    const logout = () => {
        localStorage.removeItem("localJWT")
        window.location.href = "/"
    }

    return (
        <MuiThemeProvider theme={theme}>
            <div className={styles.app__root}>
                <Grid container alignItems="center">
                    <Grid item xs={6}>
                        <h1>タスク管理アプリ</h1>
                    </Grid>
                    <Grid item xs={6}>
                        <Button className={styles.app__button} variant="outlined" onClick={logout} >
                            タスク新規登録
                        </Button>
                        <Button className={styles.app__button} variant="outlined" onClick={logout}>
                            ログアウト
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TaskList />
                    </Grid>
                </Grid>
            </div>
        </MuiThemeProvider>
    )
}
