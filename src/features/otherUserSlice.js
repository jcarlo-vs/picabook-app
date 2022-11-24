import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'https://photobook-api-server.onrender.com/api/v1/posts'

const initialState = {
	otherUser: {},
	otherUserPosts: [],
	otherUserSinglePost: {},

	isLoading: false,
	isError: false,
}

export const getOtherUserPosts = createAsyncThunk('otherUser/getOtherUserPosts', async (id, thunkAPI) => {
	try {
		const { data } = await axios.get(`${url}/otheruser/${id}`)

		console.log(data.posts)
		return data.posts
	} catch (error) {
		console.log(error)
	}
})

export const getOtherUserSinglePost = createAsyncThunk('otherUser/getUserSinglePost', async (infos, thunkAPI) => {
	try {
		const { data } = await axios.get(`${url}/otheruser/${infos.postId}/createdBy/${infos.crtId}`)

		console.log(data)
		return data.post
	} catch (error) {
		console.log(error)
	}
})

const otherUser = createSlice({
	name: 'otherUser',
	initialState,

	reducers: {},
	extraReducers: {
		[getOtherUserPosts.pending]: (state) => {
			state.isLoading = true
		},
		[getOtherUserPosts.fulfilled]: (state, { payload }) => {
			const user = payload[0]
			const { name, username, photo } = user
			state.otherUser = { name, username, photo }
			state.isLoading = false
			state.otherUserPosts = payload
		},
		[getOtherUserPosts.rejected]: (state) => {
			state.isLoading = false
			state.isError = false
		},

		[getOtherUserSinglePost.pending]: (state) => {
			state.isLoading = true
		},
		[getOtherUserSinglePost.fulfilled]: (state, { payload }) => {
			state.otherUserSinglePost = payload
			state.isLoading = false
		},
		[getOtherUserSinglePost.rejected]: (state) => {
			state.isLoading = false
		},
	},
})

export default otherUser.reducer
