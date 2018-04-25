module.exports = class Group {
    constructor(name) {
        this.name = name
        this.users = [] // TODO: return it to fucking object
    }

    addUser(user) {
        if (getUserIndex(user.name) === -1) {
            users.push(user)
            return true
        }
        return false
    }

    removeUser(userName) {
        const userIndex = getUserIndex(userName)
        if (userIndex !== -1) {
            users.splice(userIndex, 1)
            return true
        }
        return false
    }

    getUserIndex(userName) {
        return users.findIndex(user => user.name === userName)
    }
}
