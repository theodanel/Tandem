import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token: JSON.parse(localStorage.getItem("token")) || null,
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        addUserToken: (state, {payload}) => {
            state.token = payload;
            localStorage.setItem("token", JSON.stringify(payload));
        },
        removeUserToken: (state, {payload}) => {
            state.token = null;
            localStorage.removeItem("token");
        },
    }
})

export const { addUserToken, removeUserToken} = dataSlice.actions;

export default dataSlice.reducer;