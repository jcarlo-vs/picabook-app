import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { editProfileToggleHandle } from '../../features/postSlice'
import { changePassword, handleChange, updateUser } from '../../features/profileSlice'
import { Formrow } from '../../components'

const EditProfile = () => {
	const dispatch = useDispatch()
	const { user } = useSelector((store) => store.user)
	const { name, username, email, oldPassword, newPassword } = useSelector((store) => store.profile)

	const [changepassword, setChangePassword] = useState(false)

	const toggleEditProfileHandler = (e) => {
		e.preventDefault()
		dispatch(editProfileToggleHandle())
	}

	const toggleEditprofile = () => {
		setChangePassword(false)
	}

	const toggleChangePassword = () => {
		setChangePassword(true)
	}

	const submitEdit = (e) => {
		e.preventDefault()
		if (!changepassword) {
			dispatch(updateUser({ username, name, email }))
			dispatch(editProfileToggleHandle())
			return
		}

		if (changepassword) {
			dispatch(changePassword({ oldPassword, newPassword }))
			return
		}
	}

	const handleInputProfile = (e) => {
		const name = e.target.name
		const value = e.target.value
		dispatch(handleChange({ name, value }))
	}

	useEffect(() => {
		dispatch(
			handleChange({
				name: 'name',
				value: user.user.name,
			})
		)
		dispatch(
			handleChange({
				name: 'username',
				value: user.user.username,
			})
		)
		dispatch(
			handleChange({
				name: 'email',
				value: user.user.email,
			})
		)
	}, [])
	return (
		<Wrapper>
			<div className='overlay-container'>
				<div className='edit-profile-container'>
					<div className='options-container'>
						<ul>
							<li
								onClick={toggleEditprofile}
								style={{ borderBottom: `${changepassword ? '' : '#222 2px solid'}` }}>
								EDIT PROFILE
							</li>
							<li
								onClick={toggleChangePassword}
								style={{ borderBottom: `${changepassword ? '#222 2px solid' : ''}` }}>
								CHANGE PASSWORD
							</li>
						</ul>
					</div>

					<form className='form'>
						{changepassword ? (
							<>
								<Formrow
									label={'Old Password'}
									needLabel
									value={oldPassword}
									changeText={handleInputProfile}
									type={'password'}
									name={'oldPassword'}
								/>
								<Formrow
									label={'New Password'}
									needLabel
									value={newPassword}
									changeText={handleInputProfile}
									type={'password'}
									name={'newPassword'}
								/>
							</>
						) : (
							<>
								<Formrow
									label={'Username'}
									needLabel
									value={username}
									changeText={handleInputProfile}
									name={'username'}
								/>
								<Formrow
									label={'Full Name'}
									needLabel
									value={name}
									changeText={handleInputProfile}
									name={'name'}
								/>
								<Formrow
									label={'Email'}
									needLabel
									value={email}
									changeText={handleInputProfile}
									name={'email'}
								/>
							</>
						)}

						<div className='btn-container'>
							<button
								className='btn btn-hipster'
								onClick={submitEdit}>
								SAVE
							</button>
							<button
								className='btn btn-hipster'
								onClick={toggleEditProfileHandler}>
								CANCEL
							</button>
						</div>
					</form>
				</div>
			</div>
		</Wrapper>
	)
}
export default EditProfile

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 10000;
	display: flex;
	justify-content: center;
	align-items: center;

	.edit-profile-container {
		display: flex;
		background-color: white;
		border-radius: 1rem;
		max-width: 40rem;
		width: 95vw;
	}
	.btn-container {
		display: flex;
		justify-content: space-evenly;
	}
	.options-container {
		flex: 0.4;
		padding: 1rem;
	}

	.options-container ul li {
		font-size: 1rem;
		cursor: pointer;
		margin-top: 1rem;
		&:hover {
			border-bottom: 1px solid black;
		}
	}
	.form {
		flex: 1;
		border-radius: 1rem;
	}

	.options-container ul li {
		text-align: left;
	}

	@media (max-width: 580px) {
		.edit-profile-container {
			flex-direction: column;
		}
		.options-container ul {
			display: flex;
			flex-direction: row;
			gap: 1rem;
		}
		.form {
			padding: 1rem;
		}
	}
`
