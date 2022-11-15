import styled from 'styled-components'
import moment from 'moment/moment'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { viewPostToggleHandle, editPostToggleHandle } from '../../features/postSlice'
import { Loading, EditPost } from '../../components'

const ViewSinglePost = () => {
	const location = useLocation()
	const otherProfile = location.pathname.includes('/user')
	const { otherUserSinglePost } = useSelector((store) => store.otherUser)
	const { isLoading, userSinglePost, editPostToggle } = useSelector((store) => store.post)
	const dispatch = useDispatch()

	const viewPostToggleHandler = () => {
		dispatch(viewPostToggleHandle())
	}

	return (
		<Wrapper>
			<div className='overlay-container'>
				{isLoading ? (
					<Loading />
				) : (
					<>
						<div className='viewpost-container'>
							<div className='viewpost-image_container'>
								<img
									src={otherProfile ? otherUserSinglePost.image : userSinglePost.image}
									alt=''
									className='img'
								/>
							</div>
							<div className='viewpost-caption_container'>
								<p className='caption'>
									{otherProfile ? otherUserSinglePost.caption : userSinglePost.caption}
								</p>
								<div className='info-bottom'>
									<p className='date'>
										{moment(
											otherProfile ? otherUserSinglePost.createdAt : userSinglePost.createdAt
										).format('llll')}
									</p>
									{!otherProfile && (
										<button
											className='btn btn-hipster'
											onClick={() => dispatch(editPostToggleHandle())}>
											EDIT POST
										</button>
									)}
								</div>
							</div>

							<FaTimes
								className='icon'
								onClick={viewPostToggleHandler}
							/>
						</div>
						{editPostToggle && <EditPost />}
					</>
				)}
			</div>
		</Wrapper>
	)
}
export default ViewSinglePost

const Wrapper = styled.div`
	.overlay-container {
		position: fixed;
		top: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 10000;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.viewpost-container {
		background-color: #fff;
		padding: 0.5rem;
		max-width: 60rem;
		min-height: 30rem;
		width: 80vw;
		display: flex;
		position: relative;
		border-radius: 1rem;
	}
	.viewpost-image_container {
		flex: 1;
		width: 100%;

		box-shadow: 1px 0 0 rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.viewpost-image_container img {
		max-width: 100%;
		max-height: 50vh;
		display: block;
		/* box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5); */
		padding: 1rem;
	}
	.viewpost-caption_container {
		flex: 0.5;
		padding: 3rem;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.viewpost-caption_container .caption {
		padding-top: 1rem 3rem;
		font-size: clamp(0.8rem, 1vw, 1rem);
		flex: 1;
	}

	.date {
		font-size: clamp(0.8rem, 1vw, 2rem);
	}

	.info-bottom {
		padding-top: 1rem;
		margin-top: auto;
	}

	.icon {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		font-size: 1.3rem;
	}

	.btn {
		font-size: clamp(0.8rem, 1vw, 2rem);
	}

	@media (max-width: 1000px) {
		.viewpost-container {
			display: flex;
			flex-direction: column;
		}
		.viewpost-image_container {
			box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
			padding: 2rem 0;
		}
	}
`
