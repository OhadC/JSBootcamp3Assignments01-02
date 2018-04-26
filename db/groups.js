const Group = require('./../models/Group')

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
    addUserToGroup(groupName, user) {
        if (groupName in this.groups) {
            return this.groups[groupName].addUser(user)
        }
        return false
    }
    removeUserFromGroup(groupName, userName) {
        if (groupName in this.groups) {
            return this.groups[groupName].removeUser(userName)
        }
        return false
    }
    removeUserFromAllGroups(userName) {
        for (let groupName in this.groups) {
            const currentGroup = this.groups[groupName]
            this.removeUserFromGroup(groupName, userName)
        }
        return true
    }
    getGroup(name) {
        if (name in this.groups) {
            return this.groups[name]
        }
        return null
    }
    getAllGroups() {
        const groupsArr = []
        for (let groupName in this.groups) {
            groupsArr.push(this.groups[groupName])
        }
        return groupsArr
    }
}

module.exports = Groups
