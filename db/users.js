const group = require("./../models/User")

module.exports = users = {
    users: [], // TODO: return it to fucking object
    createUser: (name, password, age) => {
        if (getIndex(name) === -1) {
            users.push(new User(name, password, age))
            return true
        }
        return false
    },
    updateUser: (oldName, newName, newAge) => {
        const userIndex = getIndex(oldName)
        if (userIndex !== -1 && getIndex(newName) === -1) {
            users[userIndex].updateUser(newName, newAge)
            return true
        }
        return false
    },
    getAllUserNames: () => {
        return [] // TODO: this
    },
    deleteUser: (name) => {
        const userIndex = getIndex(name)
        if (userIndex !== -1) {
            // TODO: notify groups
            users.splice(userIndex, 1)
            return true
        }
        return false
    },
    getIndex: (name) => {
        return users.findIndex(user => user.name === name)
    }
}
