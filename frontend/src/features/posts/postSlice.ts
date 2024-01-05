import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchPosts, createPost } from './postAPI';

export enum Status {
    Initial = "Not Fetched",
    Loading = "Loading...",
    UpToDate = "Up to date",
    Deleted = "Deleted",
    Error = "Error"
}

export interface PostFormData {
    post: {
        id?: number;
        title: string;
        body: string;
    }
}

export interface PostState {
    id?: number;
    title?: string;
    body?: string;
    created_at?: any;
    updated_at?: any;
}

export interface PostsState {
    posts: PostState[];
    status: string;
}

const initialState: PostsState = {
    posts: [
        {
            id: 0,
            title: "",
            body: "",
            created_at: "",
            updated_at: "",
        }
    ],
    status: Status.Initial
}

export const fetchPostsAsync = createAsyncThunk(
    "posts/fetchPosts",
    async () => {
        const response = await fetchPosts();
        return response;
    }
);

export const createPostAsync = createAsyncThunk(
    'posts/createPost',
    async (payload: PostFormData) => {
        const response = await createPost(payload);
        return response;
    }
);

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsAsync.pending, (state) => {
                state.status = Status.Loading;
            })
            .addCase(fetchPostsAsync.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.status = Status.UpToDate;
            })
            .addCase(fetchPostsAsync.rejected, (state) => {
                state.status = Status.Error;
            })
            /* Update Section */
            .addCase(createPostAsync.pending, (state) => {
                state.status = Status.Loading;
            })
            .addCase(createPostAsync.fulfilled, (state, action) => {
                state.posts.push(action.payload);
                state.status = Status.UpToDate;
            })
            .addCase(createPostAsync.rejected, (state) => {
                state.status = Status.Error;
            })
    }
});

export const {} = postSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;

export const selectStatus = (state: RootState) => state.posts.status;

export default postSlice.reducer;