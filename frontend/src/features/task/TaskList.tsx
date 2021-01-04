import React, { useState, useEffect } from "react";
import styles from "./TaskList.module.css";

import { makeStyles, Theme } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import {
    Button,
    Avatar,
    Badge,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    TableSortLabel,
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import {
    fetchAsyncDeleteTask,
    selectTasks,
    editTask,
    selectTask,
} from "./taskSlice";
import { selectLoginUser } from "../auth/authSlice";
import { AppDispatch } from "../../app/store";
import { initialState } from "./taskSlice";
import { SORT_STATE, READ_TASK } from "../types";

const useStyles = makeStyles((theme: Theme) => ({
    table: {
        tableLayout: "fixed",
    },
    button: {
        margin: theme.spacing(3),
    },
    small: {
        margin: "auto",
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));

const TaskList: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const tasks = useSelector(selectTasks);
    const loginUser = useSelector(selectLoginUser);
    const columns = tasks[0] && Object.keys(tasks[0]);

    const [state, setState] = useState<SORT_STATE>({
        rows: tasks,
        order: "desc",
        activeKey: "",
    });

    const handleClickSortColumn = (column: keyof READ_TASK) => {
        const isDesc = column === state.activeKey && state.order === "desc";
        const newOrder = isDesc ? "asc" : "desc";
        const sortedRows = Array.from(state.rows).sort((a, b) => {
            if (a[column] > b[column]) {
                return newOrder === "asc" ? 1 : -1;
            } else if (a[column] < b[column]) {
                return newOrder === "asc" ? -1 : 1;
            } else {
                return 0;
            }
        });

        setState({
            rows: sortedRows,
            order: newOrder,
            activeKey: column,
        });
    };

    useEffect(() => {
        setState((state) => ({
            ...state,
            rows: tasks,
        }));
    }, [tasks]);

    const renderSwitch = (statusName: string) => {
        switch (statusName) {
            case "todo":
                return (
                    <Badge variant="dot" color="error">
                        {statusName}
                    </Badge>
                );
            case "Doing":
                return (
                    <Badge variant="dot" color="primary">
                        {statusName}
                    </Badge>
                );
            case "Done":
                return (
                    <Badge variant="dot" color="secondary">
                        {statusName}
                    </Badge>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                size="small"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => {
                    dispatch(
                        editTask({
                            id: 0,
                            title: "",
                            description: "",
                            responsible: loginUser.id,
                            status: "1",
                            category: 1,
                            estimate: 0,
                        })
                    );
                    dispatch(selectTask(initialState.selectedTask));
                }}
            >
                Add new
            </Button>
            {tasks[0]?.title && (
                <Table size="small" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {columns.map(
                                (column, colIndex) =>
                                    (column === "title" ||
                                        column === "status" ||
                                        column === "category" ||
                                        column === "estimate" ||
                                        column === "responsible_id" ||
                                        column === "owner_id") && (
                                        <TableCell align="center" key={colIndex}>
                                            <TableSortLabel
                                                active={state.activeKey === column}
                                                direction={state.order}
                                                onClick={() => handleClickSortColumn(column)}
                                            >
                                                <strong>{column}</strong>
                                            </TableSortLabel>
                                        </TableCell>
                                    )
                            )}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.rows.map((row, rowIndex) => (
                            <TableRow hover key={rowIndex}>
                                {Object.keys(row).map(
                                    (key, colIndex) =>
                                        (key === "title" ||
                                            key === "status" ||
                                            key === "category_item" ||
                                            key === "estimate") && (
                                            <TableCell
                                                align="center"
                                                className={styles.tasklist__hover}
                                                key={`${rowIndex}+${colIndex}`}
                                                onClick={() => {
                                                    dispatch(selectTask(row));
                                                    dispatch(editTask(initialState.editedTask));
                                                }}
                                            >
                                                {key === "status" ? (
                                                    renderSwitch(row[key])
                                                ) : (
                                                    <span>{row[key]}</span>
                                                )}
                                            </TableCell>
                                        )
                                )}
                                <TableCell>
                                    {row["responsible_id"]}
                                </TableCell>
                                <TableCell>
                                    {row["responsible_id"]}
                                </TableCell>

                                <TableCell align="center">
                                    <button
                                        className={styles.tasklist__icon}
                                        onClick={() => {
                                            dispatch(fetchAsyncDeleteTask(row.id));
                                        }}
                                        disabled={row["owner"] !== loginUser.id}
                                    >
                                        <DeleteOutlineOutlinedIcon />
                                    </button>
                                    <button
                                        className={styles.tasklist__icon}
                                        onClick={() => dispatch(editTask(row))}
                                        disabled={row["owner"] !== loginUser.id}
                                    >
                                        <EditOutlinedIcon />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    );
};

export default TaskList;