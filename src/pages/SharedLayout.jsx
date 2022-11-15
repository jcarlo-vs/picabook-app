import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import AddPhoto from '../components/AddPhoto/AddPhoto'
import Navbar from '../components/Navbar/Navbar'

const SharedLayout = () => {
	const { uploadToggle } = useSelector((store) => store.post)
	return (
		<SharedLayoutWrapper>
			<Navbar />
			<div className='shared-content'>
				<Outlet />
			</div>
			{uploadToggle && <AddPhoto />}
		</SharedLayoutWrapper>
	)
}
export default SharedLayout

const SharedLayoutWrapper = styled.div`
	.shared-content {
		/* margin-top: 1rem; */
	}
`
