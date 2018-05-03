class Groups {
    constructor() {
        this._groups = []
    }

    getGroups() {
        return this._groups
    }

    getGroup(groupName) {
        const groupIndex = this.getIndexByName(groupName)
        if (groupIndex === -1) return null
        return this._groups[groupIndex]
    }
    addGroup(group) {
        this._groups.push(group)
        return true
    }
    deleteGroup(groupName) {
        const groupIndex = this.getIndexByName(groupName)
        if (groupIndex === -1) return false
        this._groups.splice(groupIndex, 1)
        return true
    }
    addUserToGroup(user, groupName) {
        const groupIndex = this.getIndexByName(groupName)
        return groupIndex !== -1 && this._groups[groupIndex].addUser(user)
    }
    removeUserFromGroup(username, groupName) {
        const groupIndex = this.getIndexByName(groupName)
        return groupIndex !== -1 && this._groups[groupName].removeUser(username)
    }
    removeUserFromAllGroups(username) {
        this._groups.forEach(group => this._groups[groupName].removeUser(username))
    }

    getIndexById(groupId) {
        return this._groups.findIndex(group => group.getId() === groupId)
    }
    getIndexByName(groupName) {
        return this._groups.findIndex(group => group.getName() === groupName)
    }
}

module.exports = Groups
