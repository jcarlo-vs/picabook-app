import Landing from './pages/Landing'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './pages/ProtectedRoute'
import SharedLayout from './pages/SharedLayout'
import Homepage from './pages/Homepage'
import ProfilePage from './pages/ProfilePage'
import PageNotFound from './pages/PageNotFound'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './app.scss'
import OtherUser from './pages/OtherUser'
const App = () => {
	return (
		<>
			<Routes>
				{/* PROTECTED MAIN */}
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<SharedLayout />
						</ProtectedRoute>
					}>
					{/* HOME */}
					<Route
						path='/'
						element={<Homepage />}
					/>
					{/* PROFILE */}
					<Route
						path='/profile'
						element={<ProfilePage />}
					/>

					<Route
						path='/user/:id'
						element={<OtherUser />}
					/>
				</Route>
				{/* SOLO LINK */}
				<Route
					path='login'
					element={<Landing />}
				/>

				<Route
					path='*'
					element={<PageNotFound />}
				/>
			</Routes>
			<ToastContainer position='top-center' />
		</>
	)
}
export default App
