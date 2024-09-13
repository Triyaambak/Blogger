import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AuthStateType = {
    id: string;
    name: string;
    email: string;
};

const initAuthState: AuthStateType = {
    id: "",
    name: "",
    email: "",
};

const authSlice = createSlice({
    name: "authContext",
    initialState: initAuthState,
    reducers: {
        updateAuth: (state, action: PayloadAction<AuthStateType>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
    },
});

export const { updateAuth } = authSlice.actions;

export default authSlice.reducer;
