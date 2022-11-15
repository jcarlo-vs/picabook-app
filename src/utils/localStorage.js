const addUserToLocalStorage = (user) => {
	localStorage.setItem('user', JSON.stringify(user))
}

const getUserFromLocalStorage = () => {
	const results = localStorage.getItem('user')
	const user = results ? JSON.parse(results) : null
	return user
}

const removeUserFromLocalStorage = () => {
	localStorage.removeItem('user')
}

export { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage }
