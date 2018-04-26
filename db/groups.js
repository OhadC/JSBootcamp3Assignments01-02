const Group = require('./../models/Group')
const users = require('./Users')

class Groups {
    constructor() {
        this.groups = {} // {name: group, name: group}
    }
    createGroup(name) {
        if (!(name in this.groups)) {
            this.groups[name] = new Group(name)
            return true
        }
        return false
    }
    deleteGroup(name) {
        if (name in this.groups) {
            delete this.groups[name]
            return true
        }
        return false
    }
    addUserToGroup(groupName, userName) {
        if (groupName in this.groups) {
            const user = users.getUserByName(userName)
            if (user) {
                return this.groups[groupName].addUser(user)
            }
        }
        return false
    }
    removeUserFromGroup(groupName, userName) {
        if (groupName in this.groups) {
            if (user) {
                return this.groups[groupName].removeUser(username)
            }
        }
        return false
    }
    removeUserFromAllGroups(userName) {
        for (let groupName in this.groups) {
            const currentGroup = this.groups[groupName]
            removeUserFromGroup(groupName, userName)
        }
        return true
    }
    getGroup(name){
        if (name in this.groups) {
            return this.groups[name]
        }
        return null
    }
    getAllGroups(){
        const groupsArr = []
        for (let groupName in this.groups) {
            groupsArr.push(this.groups[groupName])
        }
        return groupsArr
    }
}

module.exports = new Groups()
