import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { editPostToggleHandle, editPostWrapToggleHandle, editUserPost } from '../../features/postSlice'

const EditPostWrap = () => {
	const { userSinglePost } = useSelector((store) => store.post)
	const dispatch = useDispatch()
	const [caption, setCaption] = useState('')

	const editPostSubmit = (cap) => {
		dispatch(editUserPost(cap))
		dispatch(editPostToggleHandle())
		dispatch(editPostWrapToggleHandle())
	}

	const editPostToggleHandler = () => {
		dispatch(editPostWrapToggleHandle())
	}

	return (
		<Wrapper>
			<div className='overlay-container'>
				<div className='edit-post-container'>
					<div className='image-container'>
						<img
							src={userSinglePost.image}
							alt='user image post'
							className='img'
						/>
					</div>
					<div className='caption-container'>
						<textarea
							className='form-textarea'
							placeholder='insert caption here.'
							maxLength={200}
							value={caption}
							onChange={(e) => setCaption(e.target.value)}></textarea>
						<div className='btn-container'>
							<button
								className='btn'
								onClick={() => editPostSubmit(caption)}>
								SAVE
							</button>
							<button
								className='btn'
								onClick={editPostToggleHandler}>
								CANCEL
							</button>
						</div>
					</div>
				</div>
			</div>
		</Wrapper>
	)
}
export default EditPostWrap

const Wrapper = styled.div`
	.overlay-container {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 10000;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.edit-post-container {
		max-width: 800px;
		width: 90vw;
		border-radius: 1rem;
		background-color: white;
		display: flex;
		padding: 1rem;
	}

	.image-container img {
	}

	.image-container {
		flex: 1;
		padding-bottom: 1.8rem;
	}

	.caption-container {
		flex: 0.5;
		display: flex;
		flex-direction: column;
		padding: 0 1rem;
		padding: 1rem;
	}
	.form-textarea {
		flex: 1;
		font-size: 1rem;
	}

	.btn-container {
		margin-top: auto;
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-top: auto;
		text-align: center;
	}

	@media (max-width: 898px) {
		.edit-post-container {
			flex-direction: column;
			max-width: 40rem;
		}

		.form-textarea {
			font-size: 0.8rem;
			height: 100%;
			flex: 1;
		}

		.btn-container {
			margin-top: 1rem;
		}
	}
`
