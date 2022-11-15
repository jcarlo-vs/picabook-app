import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { captionTextHandler, clearValues, createPost, uploadImage, uploadToggleHandle } from '../../features/postSlice'
import { Loading } from '../../components'

const AddPhoto = () => {
	const { uploadToggle, imageUpload, caption, isLoading } = useSelector((store) => store.post)
	const [imageData, setImageData] = useState('')

	const dispatch = useDispatch()

	const toggleHandler = (e) => {
		e.stopPropagation()
		dispatch(uploadToggleHandle())
		dispatch(clearValues('create'))
	}
	const captionDataHandler = (e) => {
		dispatch(captionTextHandler(e.target.value))
	}

	const imageUploadHandler = (e) => {
		const imagePath = e.target.files[0]
		const formData = new FormData()
		formData.append('image', imagePath)
		dispatch(uploadImage(formData))
	}

	const createPostHandler = (e) => {
		console.log('created')
		e.preventDefault()
		dispatch(uploadToggleHandle())
		dispatch(createPost({ caption: caption, image: imageUpload }))
		dispatch(clearValues('create'))

		setTimeout(() => {
			window.location.reload(true)
		}, 500)
	}

	return (
		<Wrapper>
			<div className='overlay-container'>
				<form className='form'>
					<div className='header'>
						<label className='form-label'>Enter your caption</label>
						<textarea
							className='form-textarea'
							value={caption}
							onChange={captionDataHandler}
							maxLength={200}
							style={{ fontSize: '14px' }}></textarea>

						<input
							type='file'
							className='image-input hidden'
							onChange={imageUploadHandler}
							id='addFile'
						/>
						<label
							htmlFor='addFile'
							className='upload'>
							UPLOAD FILE
						</label>
					</div>
					<div className='image_container'>
						{isLoading ? (
							<Loading />
						) : (
							<img
								src={imageUpload}
								alt=''
								className='img'
							/>
						)}
					</div>
					<button
						className='btn btn-block'
						onClick={createPostHandler}>
						SHARE
					</button>
					<FaTimes
						className='close_icon'
						onClick={toggleHandler}
					/>
				</form>
			</div>
		</Wrapper>
	)
}
export default AddPhoto

const Wrapper = styled.div`
	.overlay-container {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 10000000000000;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.close_icon {
		position: absolute;
		right: 1rem;
		top: 1rem;
	}
	.form {
		position: relative;
		max-height: 50rem;
		border-radius: 1rem;
	}

	.image_container {
		max-height: 20rem;
		display: flex;
		justify-content: center;
		box-shadow: 0 0 2px #333;
		min-height: 20rem;
	}

	.image_container img {
		max-height: 20rem;
	}

	.hidden {
		display: none;
	}
	.upload {
		font-size: 1rem;
		box-shadow: 0 0 1px 1px #333;
		border-radius: 0.5rem;
		padding: 0.2rem 0.5rem;
	}
`
