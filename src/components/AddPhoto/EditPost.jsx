import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
	clearValues,
	deletePost,
	editPostToggleHandle,
	editPostWrapToggleHandle,
	getUserPosts,
	viewPostToggleHandle,
} from '../../features/postSlice'
import { EditPostWrap } from '../../components'
const EditPost = () => {
	const { editPostWrapToggle } = useSelector((store) => store.post)
	const dispatch = useDispatch()

	const editToggleHandler = () => {
		dispatch(editPostToggleHandle())
	}

	const deletePostHandler = () => {
		dispatch(deletePost())
		dispatch(clearValues('clearSinglePost'))
		dispatch(editPostToggleHandle())
		dispatch(viewPostToggleHandle())
		dispatch(getUserPosts())
	}

	const editPostToggleHandler = () => {
		dispatch(editPostWrapToggleHandle())
	}

	return (
		<Wrapper>
			<div className='edit-container'>
				<ul>
					<li onClick={deletePostHandler}>Delete</li>
					<li onClick={editPostToggleHandler}>Edit</li>
					<li>Copy link</li>
					<li onClick={editToggleHandler}>Cancel</li>
				</ul>
			</div>
			{editPostWrapToggle && <EditPostWrap />}
		</Wrapper>
	)
}
export default EditPost

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 10000;
	display: flex;
	justify-content: center;
	align-items: center;
	.overlay-container {
	}
	.edit-container {
		background-color: white;
		border-radius: 1rem;
	}
	.edit-container ul {
		display: flex;
		flex-direction: column;
		/* gap: 1rem; */
		& > *:first-child {
			&:hover {
				color: #8c0404;
			}
			border-top-left-radius: 1rem;
			border-top-right-radius: 1rem;
		}
		& > *:last-child {
			border-bottom-left-radius: 1rem;
			border-bottom-right-radius: 1rem;
		}
	}
	.edit-container ul li {
		padding: 1rem 3rem;
	}
	.edit-container ul li:hover {
		background-color: #ddd;
		cursor: pointer;
	}
`
