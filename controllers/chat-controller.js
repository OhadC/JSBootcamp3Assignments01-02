const Chat = require('./../models/chat')
const User = require('./../models/user')
const Group = require('./../models/group')

module.exports = class ChatController {
    constructor() {
        this._chat = new Chat()
    }

    createNewUser(username, password, age) {
        this._validateUser(username, password, age)
        const newUser = new User(username, password, parseInt(age))
        this._chat.addUser(newUser)
    }
    createNewgroup(groupname) {
        if (!groupname.trim()) {
            throw new Error('You must enter group name')
        }
        const newGroup = new Group(groupname)
        this._chat.addGroup(newGroup)
    }
    addUserToGroup(username, groupname) {
        const user = this._chat.getUser(username)
        this._chat.addUserToGroup(user, groupname)
    }
    removeUserFromGroup(username, groupname) {
        this._groups.removeUserFromGroup(groupname, username)
    }
    deleteUser(username) {
        this._users.deleteUser(username)
        this._groups.removeUserFromAllGroups(username)
    }
    deleteGroup(groupname) {
        this._groups.deleteGroup(groupname)
    }
    printUsers() {
        const users = this._chat.getUsers()
        console.log()
        users.forEach(user => {
            console.log(user.getName())
        })
        console.log()
    }
    printGroups() {
        const groups = this._chat.getGroups()
        console.log()
        groups.forEach(group => {
            console.log(group.getName())
        })
        console.log()
    }
    printGroupsAndUsers() {
        const groups = this._chat.getGroups()
        console.log()
        groups.forEach(group => {
            console.log(group.getName())
            const users = group.getUsers()
            users.forEach(user => {
                console.log('\t', user.getName())
            })
        })
        console.log()
    }

    _validateUser(username, password, age) {
        if (!username.trim()) {
            throw new Error('You must enter User name')
        }
        if (!password.trim()) {
            throw new Error('You must enter Password')
        }
        if (!age.trim()) {
            throw new Error('You must enter Age')
        }
        if (!isInteger(age.trim())) {
            throw new Error('Age must be a number')
        }
    }
}

function isInteger(value) {
    return /^\d+$/.test(value);
}
