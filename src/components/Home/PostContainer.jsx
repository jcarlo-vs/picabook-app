import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getOtherUserPosts } from '../../features/otherUserSlice'
import { useState } from 'react'

const PostContainer = ({ photo, image, username, caption, createdBy, favorites, _id: id }) => {
	const dispatch = useDispatch()
	const { user } = useSelector((store) => store.user)
	const [likeCount, setLikeCount] = useState(false)
	const favor = favorites.some((item, index) => {
		return item.id === user.user.id
	})

	const getOtherUserProfile = (id) => {
		dispatch(getOtherUserPosts(id))
	}

	return (
		<PostContainerWrapper>
			<div className='post-container'>
				<header>
					<div className='image-container'>
						<img
							className='img'
							src={photo}
							alt=''
						/>
					</div>
					<Link
						to={createdBy === user.user.id ? '/profile' : `/user/${createdBy}`}
						className='username'
						onClick={() => getOtherUserProfile(createdBy)}>
						{username}
					</Link>
				</header>
				<section>
					<div className='image-container'>
						<img
							className='img'
							src={image}
							alt='post pic'
						/>
					</div>
				</section>
				<footer>
					<p className='caption'>{caption}</p>
				</footer>
			</div>
		</PostContainerWrapper>
	)
}
export default PostContainer

const PostContainerWrapper = styled.div`
	padding: 1rem;
	.post-container {
		max-width: 80%;
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		gap: 10px;
		box-shadow: var(--shadow-4), 0 0 1rem rgba(0, 0, 0, 0.1);
		border-radius: 1rem;
	}
	.favorites-icon {
		color: #df8080;
		margin-right: 1rem;
		font-size: 3rem;
	}

	header {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 1rem 0;
	}

	header .image-container {
		border-radius: 1000px;
		width: 100%;
		display: flex;
		justify-content: end;
		max-width: max-content;
		box-shadow: 0 0 5px #33333367;
		margin-left: 1rem;
	}
	header .image-container img {
		border-radius: 1000px;
		height: 3rem;
		width: 3rem;
	}
	header .username {
		font-size: 1rem;
		width: 100%;
		display: flex;
		justify-content: flex-start;

		cursor: pointer;
		&:hover {
			font-weight: 900;
		}
	}

	p {
		margin: 0;
	}
	section {
	}

	section .image-container {
		display: flex;
		justify-content: center;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
		max-height: 30rem;
		min-height: 30rem;
		min-width: 100%;
	}
	section .image-container img {
		min-width: 100%;
	}

	footer {
		min-height: 8rem;
		display: flex;
		flex-direction: column;
		padding: 1rem 1rem;
	}
	footer p {
		width: 100%;
		font-size: 0.8rem;
		text-align: left;
		margin-inline: auto;
	}
	footer .favorites {
		font-weight: 600;
		letter-spacing: 1px;
	}

	@media (max-width: 850px) {
		section .image-container {
			max-height: 20rem;
			min-height: 20rem;
			min-width: 100%;
		}
		padding: 1rem 0;
	}

	@media (max-width: 750px) {
		header .image-container img {
			border-radius: 1000px;
			height: 2.5rem;
			width: 2.5rem;
		}
	}
`
