import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token: JSON.parse(localStorage.getItem("token")) || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        addUser: (state, {payload}) => {
            state.token = payload.token;
            state.user = payload.user;
            localStorage.setItem("token", JSON.stringify(payload.token));
            localStorage.setItem("user", JSON.stringify(payload.user));
        },
        removeUser: (state, {payload}) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    }
})

export const { addUser, removeUser} = dataSlice.actions;

export default dataSlice.reducer;