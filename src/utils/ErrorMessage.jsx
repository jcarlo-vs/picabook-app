import { useEffect } from 'react'
import styled from 'styled-components'

const ErrorMessage = ({ message }) => {
	return (
		<Wrapper>
			<p className='alert-danger'>{message}</p>
		</Wrapper>
	)
}
export default ErrorMessage

const Wrapper = styled.div`
	.alert-danger {
		font-size: 0.8rem;
		padding: 0;
	}
	.hide {
		display: none;
	}
`
