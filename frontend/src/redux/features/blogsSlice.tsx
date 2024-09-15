import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BlogsType = {
	id: string;
	content: string;
	title: string;
	author: { name: string };
};

export type AllBlogsType = BlogsType[];

const allBlogsContext: AllBlogsType = [];

const blogsSlice = createSlice({
	name: "allBlogsContext",
	initialState: allBlogsContext,
	reducers: {
		updateBlogsContext: (_state, action: PayloadAction<AllBlogsType>) => {
			return action.payload;
		},
	},
});

export const { updateBlogsContext } = blogsSlice.actions;

export default blogsSlice.reducer;
