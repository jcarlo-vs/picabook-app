import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import ProfileImages from './ProfileImages'

const ProfileMainContent = ({ otheruser }) => {
	const { updatedUser, locationProfile } = useSelector((store) => store.profile)
	const { editProfileToggle, userPosts } = useSelector((store) => store.post)
	const { otherUser, otherUserPosts } = useSelector((store) => store.otherUser)

	return (
		<ProfileMainContentWrapper>
			<div className='profile-content'>
				<header className='flex-center'>
					<p>{locationProfile ? otherUserPosts.length : userPosts.length} POSTS</p>
				</header>
				<ProfileImages otheruser />
			</div>
		</ProfileMainContentWrapper>
	)
}
export default ProfileMainContent

const ProfileMainContentWrapper = styled.div`
	max-width: 80%;
	margin: 0 auto;

	header {
		gap: 2rem;
		border-bottom: solid 1px black;
	}

	@media (max-width: 850px) {
		max-width: 100%;
		p {
			font-size: 1rem;
			font-weight: bold;
		}
	}
`
