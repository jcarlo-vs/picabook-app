import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { clearAllPosts } from '../../features/AllPostSlice'

const Links = ({ link, icon }) => {
	const [widthState, setWidthState] = useState(false)
	const dispatch = useDispatch()

	const clearAllpostsHandler = () => {
		dispatch(clearAllPosts())
		console.log('hello')
	}

	const checkInnerWidth = () => {
		if (window.innerWidth <= 750) {
			setWidthState(true)
			return
		} else {
			setWidthState(false)
		}
	}
	useEffect(() => {
		setWidthState(window.innerWidth)
	}, [])

	useEffect(() => {
		window.addEventListener('resize', checkInnerWidth)
		return () => window.removeEventListener('resize', checkInnerWidth)
	}, [])

	return (
		<Wrapper
			link={link}
			widthState={widthState}>
			<Link
				onClick={link === '/profile' && clearAllpostsHandler}
				to={link}
				className='icon'>
				{icon}
			</Link>
		</Wrapper>
	)
}

export default Links

const Wrapper = styled.li`
	@media (max-width: 750px) {
		.icon {
			color: #fffdfdf9;
			filter: drop-shadow(0 1px 0.8rem black);
		}
	}

	position: relative;
	transition: all 0.3s;
	&:hover::after {
		${({ link }) => {
			if (link === '/profile') {
				return css`
					content: 'Profile';
				`
			}
			if (link === '/favorites') {
				return css`
					content: 'Favorites';
				`
			}
			if (link === '/') {
				return css`
					content: 'Home';
				`
			}
		}}
		transition: all 0.3s;
		color: white;
		position: absolute;
		bottom: -120%;
		right: 50%;
		width: max-content;
		transform: translateX(50%);
		height: 80%;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 1rem;
		font-size: 1rem;
		border-radius: 0.5rem;
		${({ widthState }) => {
			return (
				widthState &&
				css`
					display: none;
				`
			)
		}}
	}
	&:before {
		content: '';
		position: absolute;
	}
`
