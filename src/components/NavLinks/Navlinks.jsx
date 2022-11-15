import styled from 'styled-components'
import links from '../../utils/links'
import Links from './Links'

const Navlinks = () => {
	return (
		<Wrapper className='hidden'>
			<ul>
				{links.map((item, index) => {
					return (
						<Links
							{...item}
							key={index}
						/>
					)
				})}
			</ul>
		</Wrapper>
	)
}
export default Navlinks

const Wrapper = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: stretch;
	gap: 1rem;
	ul {
		display: flex;
		justify-content: center;
		flex-direction: row-reverse;
		align-items: stretch;
		gap: 2rem;
	}
`
