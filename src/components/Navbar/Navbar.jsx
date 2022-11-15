import styled from 'styled-components'
import PhotoBookLogo from '../../assets/PhotoBook-Logo.png'
import { BsPlusCircle } from 'react-icons/bs'
import { AiOutlineLogout } from 'react-icons/ai'

import { Navlinks } from '../../components'

import { useDispatch } from 'react-redux'
import { clearValues, uploadToggleHandle } from '../../features/postSlice'
import { logoutuser } from '../../features/userSlice'

const Navbar = () => {
	const dispatch = useDispatch()

	const toggleHandler = () => {
		dispatch(uploadToggleHandle())
	}

	const logoutHandler = () => {
		dispatch(clearValues('logout'))
		dispatch(logoutuser())
		console.log('logout')
	}

	return (
		<NavWrapper className='container flex-between'>
			<img
				className='img'
				src={PhotoBookLogo}
				alt=''
			/>
			<Navlinks />
			<ul className='add-logout_container'>
				<li className='add-photo_icon sidelink'>
					<BsPlusCircle
						className='icon'
						onClick={toggleHandler}
					/>
				</li>
				<li className='logout_icon sidelink'>
					<AiOutlineLogout
						className='icon '
						onClick={logoutHandler}
					/>
				</li>
			</ul>
		</NavWrapper>
	)
}
export default Navbar

const NavWrapper = styled.nav`
	height: var(--nav-height);
	position: sticky;
	top: 0;
	background-color: var(--grey-50);
	padding: 0 3rem;
	z-index: 10;
	box-shadow: 0 1px 0 rgba(0, 0, 0, 0.178);
	img {
		width: 7rem;
		filter: drop-shadow(0 0 0 black);
	}

	.add-logout_container {
		gap: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media (max-width: 750px) {
		height: 5rem;
		.icon {
			font-size: 1.5rem;
		}
		.hidden {
			position: fixed;
			bottom: 1%;
			left: 50%;
			translate: -50% 0;
			z-index: 1000000000000000000000000;
			background-color: #000000b7;
			padding: 1rem;
			border-radius: 1rem;
			padding: 0.5rem 0.8rem;
		}
		img {
			max-width: 6rem;
		}
		padding: 0 1rem;
	}

	.add-photo_icon,
	.logout_icon {
		position: relative;
	}

	.add-photo_icon:hover::after {
		content: 'Add-photo';
	}

	.logout_icon:hover::after {
		content: 'Logout';
	}
	.sidelink::after {
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
	}
`
