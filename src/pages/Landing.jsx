import styled from 'styled-components'
import LandingPhoto from '../assets/landing-herov2.png'
import LoginForm from '../components/Forms/LoginForm'

const Landing = () => {
	return (
		<Wrapper>
			<div className='container grid-2'>
				<img
					src={LandingPhoto}
					className='img landing'
					alt=''
				/>
				<LoginForm />
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	.grid-2 {
		align-items: center;
		padding: 2rem 1rem;
		gap: 3rem;
		background-color: white;
		max-width: 800px;
	}

	& > *:last-child {
		border: 1px solid rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 850px) {
		.grid-2 {
			grid-template-columns: 1fr;
			justify-items: center;
			align-items: center;
			width: max-content;
		}

		.landing {
			display: none;
		}
	}
`

export default Landing
