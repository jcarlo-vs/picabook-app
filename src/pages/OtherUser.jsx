import { useSelector } from 'react-redux'
import styled from 'styled-components'
import AddPhoto from '../components/AddPhoto/AddPhoto'
import ViewSinglePost from '../components/AddPhoto/ViewSinglePost'
import ProfileHeader from '../components/Profile/ProfileHeader'
import ProfileMainContent from '../components/Profile/ProfileMainContent'

const OtherUser = () => {
	const { uploadToggle, viewPostToggle } = useSelector((store) => store.post)

	return (
		<ProfilePageWrapper>
			<div className='container'>
				<ProfileHeader otheruser />
				<ProfileMainContent otheruser />
			</div>
			{uploadToggle && <AddPhoto />}
			{viewPostToggle && <ViewSinglePost />}
		</ProfilePageWrapper>
	)
}
export default OtherUser

const ProfilePageWrapper = styled.div``
