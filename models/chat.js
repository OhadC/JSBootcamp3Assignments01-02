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
    getUser(username){
        return this._users.getUser(username)
    }
    getGroup(groupName){
        return this._groups.getGroup(groupName)
    }

    addUser(user) {
        this._users.addUser(user)
    }
    addGroup(group) {
        this._groups.addGroup(group)
    }
    addUserToGroup(user, groupName) { // TODO: should be removed
        this._groups.addUserToGroup(user, groupName)
    }
    removeUserFromGroup(username, groupName) { // TODO: should be removed
        this._groups.removeUserFromGroup(groupName, username)
    }
    
    deleteUser(username) {
        this._users.deleteUser(username)
        this._groups.removeUserFromAllGroups(username)
    }
    deleteGroup(groupName) {
        this._groups.deleteGroup(groupName)
    }
}
