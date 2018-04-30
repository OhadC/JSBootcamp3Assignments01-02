const Users = require('./users')
const Groups = require('./groups')

module.exports = class Chat {
    constructor() {
        this._users = new Users()
        this._groups = new Groups()
    }

    getUsers() {
        return this._users.getUsers()
    }
    getGroups() {
        return this._groups.getGroups()
    }

    addUser(user) {
        this._users.addUser(user)
    }
    addGroup(group) {
        this._groups.addGroup(group)
    }
    addUserToGroup(username, groupname) {
        const user = this._users.getUser(username)
        if (!user) {
            throw new error('No user with that name')
        }
        this._groups.addUserToGroup(groupname, user)
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
}
