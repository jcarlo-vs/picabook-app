import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

const url = 'https://photobook-api-server.onrender.com/api/v1/posts'

const initialState = {
	imageUpload: '',
	caption: '',

	userPosts: [],
	userSinglePost: null,

	isLoading: false,
	isError: false,

	uploadToggle: false,
	viewPostToggle: false,
	editPostToggle: false,
	editProfileToggle: false,
	editPostWrapToggle: false,
}

export const uploadImage = createAsyncThunk('post/uploadImage', async (formData, thunkAPI) => {
	try {
		const {
			data: {
				image: { src },
			},
		} = await axios.post(`${url}/uploadImage`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return src
	} catch (error) {
		toast.error(error.response.data.msg)
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
})

export const createPost = createAsyncThunk('post/createPost', async (post, thunkAPI) => {
	try {
		const { data } = await axios.post(`${url}`, post, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		})

		return data
	} catch (error) {
		console.log(error.response.data.msg)
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
})

export const getUserPosts = createAsyncThunk('post/getUserPosts', async (_, thunkAPI) => {
	try {
		const { data } = await axios.get(`${url}/1`, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		})
		return data.posts
	} catch (error) {
		console.log(error)
	}
})

export const getSingleUserPost = createAsyncThunk('post/getSingleUserPost', async (id, thunkAPI) => {
	try {
		const { data } = await axios.get(`${url}/post/${id}`, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		})

		return data.post
	} catch (error) {
		console.log(error.response.data.msg)
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
})

export const editUserPost = createAsyncThunk('post/editUserPost', async (caption, thunkAPI) => {
	try {
		const { data } = await axios.patch(
			`${url}/${thunkAPI.getState().post.userSinglePost._id}`,
			{ caption: caption },
			{
				headers: {
					authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
				},
			}
		)
		return data.post
	} catch (error) {
		console.log(error.response.data.msg)
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
})

export const deletePost = createAsyncThunk('post/deletePost', async (_, thunkAPI) => {
	const id = thunkAPI.getState().post.userSinglePost._id
	try {
		const { data } = await axios.delete(`${url}/${id}`, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		})

		return data.msg
	} catch (error) {
		console.log(error.response.data.msg)
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
})

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		uploadToggleHandle: (state) => {
			state.uploadToggle = !state.uploadToggle
		},
		viewPostToggleHandle: (state) => {
			state.viewPostToggle = !state.viewPostToggle
		},
		editPostToggleHandle: (state) => {
			state.editPostToggle = !state.editPostToggle
		},
		editProfileToggleHandle: (state) => {
			state.editProfileToggle = !state.editProfileToggle
		},
		editPostWrapToggleHandle: (state) => {
			state.editPostWrapToggle = !state.editPostWrapToggle
		},

		captionTextHandler: (state, { payload }) => {
			state.caption = payload
		},
		clearValues: (state, { payload }) => {
			if (payload === 'clearSinglePost') {
				state.userSinglePost = ''
				return
			}

			if (payload === 'create') {
				state.caption = ''
				state.imageUpload = ''
				return
			}
			if (payload === 'logout') {
				state.userPosts = ''
				state.caption = ''
				state.imageUpload = ''
				return
			}
		},
	},
	extraReducers: {
		[uploadImage.pending]: (state) => {
			state.isLoading = true
		},
		[uploadImage.fulfilled]: (state, { payload }) => {
			console.log(payload)
			state.imageUpload = payload
			state.isLoading = false
		},
		[uploadImage.rejected]: (state) => {},

		// GET USER POSTS
		[getUserPosts.pending]: (state) => {
			state.isLoading = true
		},
		[getUserPosts.fulfilled]: (state, { payload }) => {
			state.userPosts = payload
			state.isLoading = false
		},
		[getUserPosts.rejected]: (state, { payload }) => {
			toast.error(payload)
			state.isLoadin = false
		},

		// GET SINGLE POST
		[getSingleUserPost.pending]: (state) => {
			state.isLoading = true
		},
		[getSingleUserPost.fulfilled]: (state, { payload }) => {
			state.userSinglePost = payload
			state.isLoading = false
		},
		[getSingleUserPost.rejected]: (state) => {},

		// UPDATE POST
		[editUserPost.pending]: (state) => {
			state.isLoading = true
		},
		[editUserPost.fulfilled]: (state, { payload }) => {
			state.userSinglePost = payload
			state.isLoading = false
		},
		[editUserPost.rejected]: (state, { payload }) => {
			toast.error(payload)
			state.isLoading = false
		},

		//delete
		[deletePost.pending]: (state) => {
			state.isLoading = true
		},
		[deletePost.fulfilled]: (state, { payload }) => {
			toast.success(payload)
			state.isLoading = false
		},
		[deletePost.rejected]: (state, { payload }) => {
			toast.error(payload)
			state.isLoading = false
		},
	},
})

export const {
	editPostToggleHandle,
	uploadToggleHandle,
	editProfileToggleHandle,
	editPostWrapToggleHandle,
	captionTextHandler,
	clearValues,
	viewPostToggleHandle,
} = postSlice.actions
export default postSlice.reducer
