import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type CredentialsStateType = {
	name: string;
	email: string;
	password: string;
};

export type UserInputType = {
	label: keyof CredentialsStateType;
	value: string;
};

const InitAuthState: CredentialsStateType = {
	name: "",
	email: "",
	password: "",
};

const credentialsSlice = createSlice({
	name: "credentialsContext",
	initialState: InitAuthState,
	reducers: {
		updateCredentials: (state, action: PayloadAction<UserInputType>) => {
			state[action.payload.label] = action.payload.value;
		},
	},
});

export const { updateCredentials } = credentialsSlice.actions;

export default credentialsSlice.reducer;
