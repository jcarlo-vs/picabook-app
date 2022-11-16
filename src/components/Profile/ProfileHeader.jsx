import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { editProfileToggleHandle } from '../../features/postSlice'
import { locationToggle, uploadPhoto } from '../../features/profileSlice'
import { userUpdate } from '../../features/userSlice'
import { EditProfile } from '../../components'

const ProfileHeader = ({ otheruser }) => {
	const location = useLocation()
	const otherProfile = location.pathname.includes('/user')
	const { otherUser, otherUserPosts } = useSelector((store) => store.otherUser)

	const { user } = useSelector((store) => store.user)
	const { editProfileToggle, userPosts } = useSelector((store) => store.post)
	const { updatedUser, locationProfile } = useSelector((store) => store.profile)
	const dispatch = useDispatch()

	const toggleEditProfileHandler = () => {
		dispatch(editProfileToggleHandle())
	}

	useEffect(() => {
		dispatch(userUpdate())
	}, [updatedUser])

	const imageUploadHandler = (e) => {
		const imagePath = e.target.files[0]
		console.log(imagePath)
		const formData = new FormData()
		formData.append('image', imagePath)
		dispatch(uploadPhoto(formData))
	}

	useEffect(() => {
		dispatch(locationToggle(otherProfile))
	}, [])
	return (
		<ProfileHeaderWrapper>
			<div className='profile-header flex-center'>
				<div className='image-container flex-center'>
					<div className='profile-photo'>
						<img
							className='img '
							src={locationProfile ? otherUser.photo : user.user.photo}
							alt=''
						/>
						{locationProfile ? (
							''
						) : (
							<div className='add-profile-image'>
								<input
									type='file'
									id='files'
									className='hidden'
									onChange={imageUploadHandler}
								/>
								<label htmlFor='files'></label>
							</div>
						)}
					</div>

					<>
						<p>{locationProfile ? otherUser.name : user.user.name}</p>
					</>
				</div>
				<div className='right-container'>
					<div className='top-section'>
						{locationProfile ? (
							<></>
						) : (
							<button
								className='btn'
								onClick={toggleEditProfileHandler}>
								EDIT PROFILE
							</button>
						)}

						<p className='name'>{locationProfile ? otherUser.username : user.user.username}</p>
					</div>
				</div>
			</div>
			{editProfileToggle && <EditProfile />}
		</ProfileHeaderWrapper>
	)
}
export default ProfileHeader

const ProfileHeaderWrapper = styled.div`
	height: 15rem;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	.profile-header.flex-center {
		gap: 10rem;
		height: 80%;
	}
	/* IMAGE CONTAINER */
	.image-container {
		flex-direction: column;
		gap: 1rem;
	}
	.image-container img {
		border-radius: 100000%;
		box-shadow: 0 0 2px 5px var(--grey-400);
		width: 8rem;
		height: 8rem;
	}

	/* RIGHT CONTAINER */
	.right-container.flex-center {
		flex-direction: column;
	}
	p {
		margin: 0;
		text-transform: capitalize;
	}
	.name {
		font-weight: 900;
	}

	.top-section {
		gap: 1rem;
		justify-content: center;
		text-align: center;
	}
	button {
		font-size: 1rem;
		padding: 0.3rem 1rem;
		border: none;
		box-shadow: 0 0 0 1px #333;
	}

	.info-section {
		font-size: 1rem;
		gap: 1rem;
	}
	.profile-photo {
		position: relative;
	}

	.add-profile-image {
		position: absolute;
		max-width: max-content;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		translate: -50% -50%;
		z-index: 100000000;
		text-align: center;
		border-radius: 1000px;
		cursor: pointer;

		&:hover {
			background-color: rgba(0, 0, 0, 0.2);
		}
		label {
			display: flex;
			height: 100%;
			width: 20rem;
			max-width: 100%;
			border-radius: 1000px;
			cursor: pointer;
			&:after {
				position: absolute;
				top: 50%;
				left: 50%;
				translate: -50% -50%;
			}
			&:hover::after {
				content: 'CHANGE PHOTO';
				color: #ffffff99;
				font-size: 0.8rem;
				filter: drop-shadow(10px 3px 20px black);
			}
		}
	}

	.hidden {
		display: none;
	}

	@media (max-width: 750px) {
		.profile-header.flex-center {
			gap: 2rem;
		}
		.image-container img {
			width: 5rem;
			height: 5rem;
		}
		.btn {
			max-width: 80%;
			font-size: 0.8rem;
		}
		height: 12rem;
		.profile-header.flex-center {
			height: 100%;
		}
	}

	@media (max-width: 550px) {
		.name {
			font-size: 1rem;
		}
		.info-section {
			flex-direction: column;
			gap: 0;
			align-items: flex-start;
		}
		.info-section p {
			font-size: 12px;
		}
		.right-container.flex-center {
			justify-content: flex-start;
		}

		.right-container p {
			font-size: 1rem;
		}
	}
`
