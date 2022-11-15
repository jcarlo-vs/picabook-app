import styled, { css } from 'styled-components'

const Loading = ({ small }) => {
	return (
		<Wrapper
			className='loading'
			small={small}></Wrapper>
	)
}
export default Loading

const Wrapper = styled.div`
	${({ small }) => {
		return small
			? css`
					width: 1.5rem;
					height: 1.5rem;
					margin-right: 2rem;
			  `
			: css`
					width: 5rem;
					height: 5rem;
			  `
	}}
`
