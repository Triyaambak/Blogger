import { configureStore } from "@reduxjs/toolkit";
import credentialsContext from "./features/credentialsSlice";
import authContext from "./features/authSlice";

export const store = configureStore({
    reducer: {
        credentialsContext,
        authContext,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
