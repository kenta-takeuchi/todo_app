import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import {
    AUTH_STATE,
    CRED,
    JWT,
    USER,
} from "../types";

export const fetchAsyncLogin = createAsyncThunk(
    "auth/login",
    async (auth: CRED) => {
        const res = await axios.post<JWT>(
            `${process.env.REACT_APP_API_URL}/api/v1/login`,
            auth,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data;
    }
);

export const fetchAsyncRegister = createAsyncThunk(
    "auth/register",
    async (auth: CRED) => {
        const res = await axios.post<USER>(
            `${process.env.REACT_APP_API_URL}/api/v1/create/`,
            auth,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data;
    }
);

const initialState: AUTH_STATE = {
    isLoginView: true,
    loginUser: {
        id: 0,
        username: "",
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        toggleMode(state) {
            state.isLoginView = !state.isLoginView;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchAsyncLogin.fulfilled,
            (state, action: PayloadAction<JWT>) => {
                localStorage.setItem("localJWT", action.payload.access);
                action.payload.access && (window.location.href = "/top");
            }
        );
    },
});

export const { toggleMode } = authSlice.actions;

export const selectIsLoginView = (state: RootState) => state.auth.isLoginView;
export const selectLoginUser = (state: RootState) => state.auth.loginUser;

export default authSlice.reducer;