import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { addUserToLocalStorage, removeUserFromLocalStorage } from '../utils/localStorage'
import { editProfileToggleHandle } from './postSlice'

const url = 'https://photobook-api-server.onrender.com/api/v1/profile'

const initialState = {
	name: '',
	photo: '',
	username: '',
	email: '',
	oldPassword: '',
	newPassword: '',

	isLoading: false,
	isError: false,
	updatedUser: {},

	locationProfile: false,
}

export const updateUser = createAsyncThunk('profile/updateUser', async (updatedData, thunkAPI) => {
	try {
		const { data } = await axios.patch(`${url}/edit`, updatedData, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		})
		console.log(data)
		return data
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
})

export const uploadPhoto = createAsyncThunk('profile/uploadPhoto', async (formData, thunkAPI) => {
	try {
		const { data } = await axios.patch(`${url}/updatePhoto`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		})
		console.log(data)
		return data
	} catch (error) {
		console.log(error)
		toast.error(error.response.data.msg)
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
})

export const changePassword = createAsyncThunk('profile/changePassword', async (passwordData, thunkAPI) => {
	console.log(passwordData)
	try {
		const { data } = await axios.patch(`${url}/updatePassword`, passwordData, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		})
		toast.success('password changed')
		thunkAPI.dispatch(editProfileToggleHandle())
	} catch (error) {
		console.log(error)
		toast.error(error.response.data.msg)
	}
})

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		handleChange: (state, { payload: { name, value } }) => {
			return { ...state, [name]: value }
		},
		locationToggle: (state, { payload }) => {
			state.locationProfile = payload
		},
	},

	extraReducers: {
		[updateUser.pending]: (state) => {
			state.isLoading = true
			state.isError = false
		},
		[updateUser.fulfilled]: (state, { payload }) => {
			removeUserFromLocalStorage()
			addUserToLocalStorage(payload)
			state.updatedUser = payload
			state.isLoading = false
			state.isError = false
		},
		[updateUser.rejected]: (state, { payload }) => {
			state.isError = true
			toast.error(payload)
		},

		// UPLOAD PHOTO
		[uploadPhoto.pending]: (state) => {
			state.isLoading = true
			state.isError = false
		},
		[uploadPhoto.fulfilled]: (state, { payload }) => {
			removeUserFromLocalStorage()
			addUserToLocalStorage(payload)
			state.updatedUser = payload
			state.isLoading = false
			state.isError = false
		},
		[uploadPhoto.rejected]: (state, { payload }) => {
			state.isError = true
			toast.error(payload)
		},
	},
})

export const { handleChange, locationToggle } = profileSlice.actions
export default profileSlice.reducer
