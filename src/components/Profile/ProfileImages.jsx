import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getOtherUserPosts, getOtherUserSinglePost } from '../../features/otherUserSlice'
import { getSingleUserPost, getUserPosts, viewPostToggleHandle } from '../../features/postSlice'

const ProfileImages = () => {
	const { id } = useParams()
	const { userPosts, imageUpload, userSinglePost } = useSelector((store) => store.post)
	const { locationProfile } = useSelector((store) => store.profile)
	const { otherUserPosts, otherUserSinglePost } = useSelector((store) => store.otherUser)
	const dispatch = useDispatch()

	const postRole = locationProfile ? otherUserPosts : userPosts

	useEffect(() => {
		dispatch(getUserPosts())
		if (locationProfile) {
			dispatch(getOtherUserPosts(id))
		}
	}, [imageUpload, userSinglePost, otherUserSinglePost])

	const viewPostToggleHandler = () => {
		dispatch(viewPostToggleHandle())
	}

	const getSinglePostHandler = (id) => {
		dispatch(getSingleUserPost(id))
	}

	const getOtherPost = (id, createdBy) => {
		dispatch(getOtherUserSinglePost({ postId: id, crtId: createdBy }))
	}

	return (
		<ProfileImagesWrapper>
			{userPosts && (
				<div className='profile_images-container'>
					{postRole.map((item, index) => {
						const { image, _id: id, createdBy } = item
						return (
							<div
								className='post-container'
								key={index}
								onClick={(e) => {
									viewPostToggleHandler()
									locationProfile ? getOtherPost(id, createdBy) : getSinglePostHandler(id)
								}}>
								<img
									src={image}
									alt='images'
									className='img'
								/>
							</div>
						)
					})}
				</div>
			)}
		</ProfileImagesWrapper>
	)
}
export default ProfileImages

const ProfileImagesWrapper = styled.div`
	.profile_images-container {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		padding: 0.5rem;
	}
	.post-container {
		width: 100%;
		height: 18rem;
		width: 18rem;
		display: flex;
		justify-content: center;
		position: relative;
		cursor: pointer;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
		padding: 0.3rem;
	}
	.img {
		min-width: 100%;
	}
	.post-container::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	.post-container:hover::after {
		background-color: rgba(0, 0, 0, 0.4);
	}

	@media (max-width: 850px) {
		.post-container {
			width: 10rem;
			height: 10rem;
		}
	}
`
