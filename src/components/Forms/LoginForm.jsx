import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { loginUser, registerUser } from '../../features/userSlice'
import Formrow from './Formrow'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import PhotoBookLogo from '../../assets/PhotoBook-Logo.png'
const initialState = {
	name: '',
	email: '',
	username: '',
	password: '',
	isMember: true,
}

const LoginForm = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { user, isError, isLoading } = useSelector((store) => store.user)
	const [values, setValues] = useState(initialState)

	const onChangeHandler = (e) => {
		const name = e.target.name
		const value = e.target.value
		setValues({ ...values, [name]: value })
	}
	const isMemberToggle = () => {
		setValues({ ...values, isMember: !values.isMember })
	}
	const loginSubmitHandler = (e) => {
		e.preventDefault()
		const { name, email, username, password } = values

		// REGISTRATION
		if (!values.isMember) {
			console.log('hello')
			if (!name || !email || !username || !password) {
				toast.error('Please complete the values')
				return
			}
			dispatch(registerUser({ name, email, username, password }))
			return
		}

		// LOGIN
		if (values.isMember) {
			const { email, password } = values
			if (!email || !password) {
				toast.error('Please complete the values')
				return
			}

			dispatch(loginUser({ email, password }))
			return
		}
	}
	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate('/')
			}, 2000)
		}
	}, [user])

	useEffect(() => {})

	return (
		<FormWrapper>
			<img
				className='img logo'
				src={PhotoBookLogo}
				alt=''
			/>
			<form className='form'>
				{!values.isMember && (
					<>
						<Formrow
							label={'Full Name'}
							value={values.name}
							name={'name'}
							changeText={onChangeHandler}
						/>
						<Formrow
							label={'Username'}
							value={values.username}
							name={'username'}
							changeText={onChangeHandler}
						/>
					</>
				)}
				<Formrow
					label={'Email'}
					value={values.email}
					name={'email'}
					changeText={onChangeHandler}
				/>
				<Formrow
					label={'Password'}
					value={values.password}
					name={'password'}
					changeText={onChangeHandler}
					type={'password'}
				/>

				<button
					className='btn btn-block'
					onClick={loginSubmitHandler}>
					{values.isMember ? 'Log in' : 'Sign up'}
				</button>

				<div className='signup-container flex-center'>
					<p>{values.isMember ? `Don't Have account yet?` : `Have an account?`}</p>
					<button
						className='signup-btn'
						type='button'
						onClick={isMemberToggle}>
						{!values.isMember ? 'Log in' : 'Sign up'}
					</button>
				</div>
			</form>
		</FormWrapper>
	)
}

const FormWrapper = styled.div`
	height: 100%;
	text-align: center;
	padding: 3rem 0;
	.logo {
		text-align: center;
		margin: 0 auto;
		width: 10rem;
	}
	h2 {
		font-size: 2rem;
	}
	.app-name {
		color: #333;
	}
	.form {
		width: 80vw;
		max-width: 350px;
		padding: 1rem;
		height: 90%;
		box-shadow: none;
	}

	.signup-container {
		/* align-items: flex-end; */
		margin-top: 2rem;
		gap: 1rem;
		p {
			margin: 0;
			font-size: 1rem;
			padding: 0;
		}
		button {
			font-size: 1rem;
			cursor: pointer;
		}
	}
	.signup-btn {
		border: none;
		background-color: transparent;
		color: #169cd1;
		font-weight: 800;
		font-size: 1rem;
		display: block;
	}

	@media (max-width: 440px) {
		.signup-container {
			/* align-items: flex-end; */
			margin-top: 2rem;
			gap: 1rem;
			p {
				margin: 0;
				font-size: 0.8rem;
				padding: 0;
			}
			button {
				font-size: 0.8rem;
				cursor: pointer;
			}
		}
	}
`

export default LoginForm
