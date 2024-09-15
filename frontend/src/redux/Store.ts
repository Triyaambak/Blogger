import { configureStore } from "@reduxjs/toolkit";
import credentialsContext from "./features/credentialsSlice";
import authContext from "./features/authSlice";
import allBlogsContext from "./features/blogsSlice";

export const store = configureStore({
	reducer: {
		credentialsContext,
		authContext,
		allBlogsContext,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
