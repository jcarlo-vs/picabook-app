import { useSelector } from 'react-redux'
import styled from 'styled-components'
import AddPhoto from '../components/AddPhoto/AddPhoto'
import ViewSinglePost from '../components/AddPhoto/ViewSinglePost'
import ProfileHeader from '../components/Profile/ProfileHeader'
import ProfileMainContent from '../components/Profile/ProfileMainContent'

const ProfilePage = () => {
	const { uploadToggle, viewPostToggle } = useSelector((store) => store.post)

	return (
		<ProfilePageWrapper>
			<div className='container'>
				<ProfileHeader />
				<ProfileMainContent />
			</div>
			{uploadToggle && <AddPhoto />}
			{viewPostToggle && <ViewSinglePost />}
		</ProfilePageWrapper>
	)
}
export default ProfilePage

const ProfilePageWrapper = styled.div`
	/* padding: 0; */
`
