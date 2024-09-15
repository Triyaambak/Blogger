import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BlogsType = {
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
		addBlogsContext: (state, action: PayloadAction<BlogsType>) => {
			state.push(action.payload);
		},
	},
});

export const { updateBlogsContext, addBlogsContext } = blogsSlice.actions;

export default blogsSlice.reducer;
