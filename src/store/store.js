import { configureStore } from '@reduxjs/toolkit'
import PostReducer from '../features/postSlice'
import UserReducer from '../features/userSlice'
import AllPostReducer from '../features/AllPostSlice'
import ProfileReducer from '../features/profileSlice'
import OtherUserReducer from '../features/otherUserSlice'

export const store = configureStore({
	reducer: {
		post: PostReducer,
		user: UserReducer,
		allPost: AllPostReducer,
		profile: ProfileReducer,
		otherUser: OtherUserReducer,
	},
})
