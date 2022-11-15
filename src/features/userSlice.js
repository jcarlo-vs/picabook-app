import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../utils/localStorage'

const url = 'https://photobook-api-server.onrender.com/api/v1/auth'

const initialState = {
	user: getUserFromLocalStorage(),
	username: null,
	userID: null,

	isLoading: true,
	isError: false,

	errorMsg: null,
}

export const registerUser = createAsyncThunk('user/registerUser', async (registerData, thunkAPI) => {
	try {
		const { data } = await axios.post(`${url}/register`, registerData)
	} catch (error) {
		console.log(error.response.data.msg)
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
})

export const loginUser = createAsyncThunk('user/loginUser', async (loginData, thunkAPI) => {
	console.log(loginData)

	try {
		const { data } = await axios.post(`${url}/login`, loginData)

		return data
	} catch (error) {
		console.log(error.response.data.msg)
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
})

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logoutuser: (state) => {
			console.log('logout')
			state.user = null
			removeUserFromLocalStorage()
		},
		userUpdate: (state) => {
			state.user = getUserFromLocalStorage()
		},
	},
	extraReducers: {
		//REGISTER USER
		[registerUser.pending]: (state) => {
			state.isLoading = true
			state.isError = false
		},
		[registerUser.fulfilled]: (state, { payload }) => {
			state.isLoading = false
			state.isError = false
			toast.success('Registration Successful')
		},
		[registerUser.rejected]: (state, { payload }) => {
			state.isError = true
			toast.error(payload)
			state.isLoading = false
		},

		// LOGIN USER
		[loginUser.pending]: (state) => {
			state.isLoading = true
			state.isError = false
		},
		[loginUser.fulfilled]: (state, { payload }) => {
			state.user = payload
			addUserToLocalStorage(payload)
			state.isLoading = false
		},
		[loginUser.rejected]: (state, { payload }) => {
			toast.error(payload)
			state.isLoading = false
		},
	},
})

export const { logoutuser, userUpdate } = userSlice.actions
export default userSlice.reducer
