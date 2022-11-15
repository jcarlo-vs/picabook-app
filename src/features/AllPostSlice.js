import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'https://photobook-api-server.onrender.com/api/v1/posts'

const initialState = {
	allPosts: [],
	isLoading: false,
	isError: false,

	newImages: true,
	page: 1,
}

export const getAllPost = createAsyncThunk('allPosts/getAllPost', async (page, thunkAPI) => {
	try {
		const { data } = await axios.get(`${url}?page=${page}`)

		return data.posts
	} catch (error) {
		console.log(error)
	}
})

const allPostSlice = createSlice({
	name: 'allPosts',
	initialState,
	reducers: {
		clearAllPosts: (state, { payload }) => {
			if (payload === 'false') {
				console.log(payload)
				state.page = 1
				return
			}

			state.allPosts = []
			state.newImages = true
			state.page = 1
		},
		pageLoader: (state) => {
			console.log('page loader')
			state.page = state.page + 1
		},
	},
	extraReducers: {
		[getAllPost.pending]: (state) => {
			state.isLoading = true
			state.isError = false
			state.newImages = false
		},
		[getAllPost.fulfilled]: (state, { payload }) => {
			if (payload.length === 0) {
				state.isLoading = false
				state.newImages = false
				return
			}
			state.mounter = state.mounter + 1
			state.newImages = true
			state.allPosts = [...state.allPosts, ...payload]
			state.newImages = true
			state.isLoading = false
		},
		[getAllPost.rejected]: (state) => {
			state.isLoading = false
			state.isError = true
		},
	},
})
export const { clearAllPosts, pageLoader } = allPostSlice.actions
export default allPostSlice.reducer
