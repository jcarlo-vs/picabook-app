import styled from 'styled-components'

const Formrow = ({ name, label, value, changeText, needLabel, type }) => {
	return (
		<FormRowWrapper className='form-row'>
			{needLabel && <label className='form-label'>{label}</label>}
			<input
				type={type || 'text'}
				className='form-input'
				name={name}
				placeholder={label}
				value={value}
				onChange={changeText}
			/>
		</FormRowWrapper>
	)
}

const FormRowWrapper = styled.div`
	input {
		&::placeholder {
			font-size: 0.8rem;
		}
		font-size: 0.8rem;
		padding: 0.8rem 1rem;
	}
`
export default Formrow
