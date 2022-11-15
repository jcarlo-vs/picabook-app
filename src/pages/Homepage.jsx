import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllPosts, getAllPost, pageLoader } from '../features/AllPostSlice'
import { PostContainer, Loading } from '../components'

import { useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'

const Homepage = () => {
	const location = useLocation().pathname

	const { allPosts, isLoading, newImages, page } = useSelector((store) => store.allPost)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!newImages) {
			return
		}
		dispatch(getAllPost(page))
	}, [page])

	const handleScroll = () => {
		if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
			dispatch(pageLoader())
		}
	}

	const reached = () => {
		console.log(window.innerHeight)
		console.log(document.documentElement.scrollTop + 2)
		console.log(document.documentElement.scrollHeight)
		if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
			console.log('reached')
			return
		}
	}

	useEffect(() => {
		reached()
	}, [])

	useEffect(() => {
		dispatch(clearAllPosts('false'))
		if (location != '/') return
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])
	useLayoutEffect(() => {
		dispatch(clearAllPosts('false'))
	}, [])

	return (
		<HomeWrapper className='container'>
			{allPosts &&
				allPosts.map((item, index) => {
					return (
						<PostContainer
							{...item}
							key={index}
						/>
					)
				})}
			{isLoading && <Loading />}
		</HomeWrapper>
	)
}
export default Homepage

const HomeWrapper = styled.div`
	text-align: center;
	max-width: 800px;
	margin-top: 2rem;
	border-left: 1px solid #ddd;
	border-right: 1px solid #ddd;
`
