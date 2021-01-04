import React, {useEffect} from "react";
import {
    Grid,
    createMuiTheme,
    MuiThemeProvider,
    Theme, Button
} from "@material-ui/core";

import {AppDispatch} from "../../app/store";

import styles from "./css/top.module.css"
import {
    fetchAsyncGetTasks,
    fetchAsyncGetUsers,
    fetchAsyncGetCategory,
} from "../../features/task/taskSlice";
import TaskList from "../../features/task/TaskList";
import {useDispatch} from "react-redux";

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: "#3cb371",
        },
    },
});


export const Top: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem("localJWT")
        window.location.href = "/login"
    }

    useEffect(() => {
        const fetchBootLoader = async () => {
            await dispatch(fetchAsyncGetTasks());
            await dispatch(fetchAsyncGetUsers());
            await dispatch(fetchAsyncGetCategory());
        };
        fetchBootLoader();
    }, [dispatch]);

    return (
        <MuiThemeProvider theme={theme}>
            <div className={styles.app__root}>
                <Grid container alignItems="center">
                    <Grid item xs={6}>
                        <h1>タスク管理アプリ</h1>
                    </Grid>
                    <Grid item xs={6}>
                        <Button className={styles.app__button} variant="outlined" onClick={logout}>
                            タスク新規登録
                        </Button>
                        <Button className={styles.app__button} variant="outlined" onClick={logout}>
                            ログアウト
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TaskList/>
                    </Grid>
                </Grid>
            </div>
        </MuiThemeProvider>
    )
}
