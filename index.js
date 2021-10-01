import { v4 as uuidv4 } from "uuid"

// const idOne = uuidv4()
// const idTwo = uuidv4()
// const idThree = uuidv4()
const getUsersBtn = document.getElementById("getUsers")

// pseudo database
let users = {
	1: {
		id: 1,
		firstName: "shivani",
		lastName: "singh",
		isDeveloper: true
	},
	2: {
		id: 2,
		firstName: "dan",
		lastName: "dunn",
		isDeveloper: false
	},
	3: {
		id: 3,
		firstName: "hari",
		lastName: "S",
		isDeveloper: true
	}
}
// GET all users
const getUsers = () => {
	return new Promise((resolve, reject) => {
		if(users.length === 0) {
			setTimeout(() => reject(new Error("No users found")), 200)
		}
		setTimeout(() => resolve(Object.values(users)), 1000)
	})
}

// Usage 1 -- using thennable
// getUsers()
// 	.then(data => console.log(data))
// 	.catch(err => console.log("error ", err))

// Usage 2 -- using async await
const getUserAsync = async () => {
	try {
		const result = await getUsers()
		console.log("got the users as ", result)
		renderData(result)
	} catch (error) {
		console.log("err ", error)
	}
}

getUsersBtn.addEventListener("click", getUserAsync)

// GET a single user
const getUser = (id) => {
	return new Promise((resolve, reject) => {
		if(!users[id]) {
			setTimeout(() => reject(new Error("user id not found")), 250)
		}
		setTimeout(() => resolve(users[id]), 1000)
	})
}


const getUserById = async (id) => {
	try {
		const result = await getUser(id)
		console.log("returned user ", result)
	} catch(err) {
		console.log("error ", err)
	}
}

getUserById(1)

//  CREATE a new user
const createNewUser = (data) => {
	return new Promise((resolve, reject) => {
		if(!data.firstName || !data.lastName) {
			setTimeout(() => reject(new Error("not enough info to create a user")), 250)
		}

		const id = uuidv4()
		const newUser = {id, ...data}
		users = { ...users, [id]: newUser}

		setTimeout(() => resolve(true), 500)
	})
}

const doCreateNewUser = async (data) => {
	try {
		const result = await createNewUser(data)
		console.log("user created ", result)
	} catch(err) {
		console.log(err)
	}
}

doCreateNewUser( {firstName: "floyd", lastName: "singh"} )

// UPDATE an existing user

const updateUser = (id, data) => {
	return new Promise((resolve, reject) => {
		if(!users[id]) {
			setTimeout(() => reject(new Error("user id not found")), 250)
		}

		users[id] = { ...users[id], ...data}
		setTimeout(() => resolve(true), 500)
	})
}

const doUpdateUser = (id, data) => {
	try {
		const result = await updateUser(id, data)
		console.log("user updated ", result)
	} catch(err) {
		console.log(err)
	}
}

doUpdateUser('1', { isDeveloper: false })

// DELETE User

const deleteUser = (id) => {
	return new Promise((resolve, reject) => {
		const { [id]: user, ...rest} = users

		if(!user) {
			setTimeout(() => reject(new Error("user not found to delete")), 250)
		}

		users = { ...rest }
		setTimeout(() => resolve(true), 250)
	})
}

const goDeleteUser = async (id) => {
	try {
		const result = await deleteUser(id)
		console.log("user deleted successfully ", result)
	} catch(err) {
		console.log(err)
	}
}

goDeleteUser('1')


// Using fetch with Promise.all
const renderData = (result) => {
	const resultWrapper = document.getElementById("resultWrapper")
	for(let i = 0; i < result.length ; i++) {
		const idx = "res" + i
		resultWrapper.appendChild(document.createElement("div")).setAttribute("id", idx)
		const listEl = document.getElementById(idx)
		console.log(result[i])
		listEl.innerText = `${result[i].firstName} ${result[i].lastName} is ${result[i].isDeveloper ? 'a' : 'not a'} developer`
	}
	
}

const getMockData = () => {
	return Promise.all([
		fetch("https://jsonplaceholder.typicode.com/posts"),
		fetch("https://jsonplaceholder.typicode.com/users")
	]).then((responses) => {
		return Promise.all(responses.map(response => {
			return response.json()
		}))
	})
}

const renderMockData = async() => {
	try {
		const result = await getMockData()
		console.log("moved data ", result[0][0].title)
		const newDiv = document.getElementById("renderMockData")
		newDiv.innerText = result[0][0].title
	} catch (err) {
		console.log("error ", err)
	}
}

renderMockData()
