const usersData = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const getAllUsers = (req, res) => {
    res.json(usersData.users)
}

const createNewUser = (req, res) => {
    // check for all three mandatory fields
    if (!req?.body?.username || !req?.body?.email || !req?.body?.password) {
        return res.status(400).json({ 'message': 'Username, email and password are required' })
    }

    const newUser = {
        id: usersData.users[usersData.users.length - 1].id + 1 || 1,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        profilepic: null,
        badges: {
            firstStory: false,
            firstThree: false
        }
    }

    usersData.setUsers([...usersData.users, newUser])
    res.status(201).json(newUser)
}

const updateUser = (req, res) => {
    // check for id component
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'User ID required' })
    }
    const reqUser = usersData.users.find((user) => user.id === parseInt(req.body.id))
    // check if requested user is present
    if(!reqUser) res.status(400).json({ 'message': 'User not found' })

    if (req.body.username) reqUser.username = req.body.username
    if (req.body.password) reqUser.password = req.body.password

    const filteredUsers = usersData.users.filter((user) => user.id !== parseInt(req.body.id))
    const unsortedUsersArray = [...filteredUsers, reqUser]
    usersData.setUsers(unsortedUsersArray.sort((a, b) => {
        a.id > b.id ? 1 :
        a.id < b.id ? -1 :
        0
    }))

    res.status(201).json(reqUser)
}

const deleteUser = (req, res) => {
    // check for id component
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'User ID required' })
    }
    const reqUser = usersData.users.find((user) => user.id === parseInt(req.body.id))
    // check if requested user is present
    if (!reqUser) res.status(400).json({ 'message': 'User not found' })

    const filteredUsers = usersData.users.filter((user) => user.id !== parseInt(req.body.id))    
    usersData.setUsers(filteredUsers)

    res.status(201).json({ "id": req.body.id })
}

module.exports = { 
    getAllUsers, 
    createNewUser, 
    updateUser, 
    deleteUser 
}