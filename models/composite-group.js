const Group = require('./group')

class CompositeGroup extends Group {
    constructor(name, parent) {
        super(name)
        this._parent = parent || null
        this._groups = {}
        this._usersCount = 0
    }

    getParent() {
        return this._parent
    }
    getGroups() {
        return Object.values(this._groups)
    }
    getGroupsKeys() {
        return Object.keys(this._groups)
    }
    getUsersCount() {
        return this._usersCount
    }
    updateUsersCount() {
        this._usersCount = Object.values(this._groups).reduce((sum, group) => {
            group.updateUsersCount()
            return sum + group.getUsersCount()
        }, 0) + Object.keys(this._users).length
    }
    addUser(user) {
        if (this._users[user.getName()]) return false
        this._users[user.getName()] = user
        this.preventTwoEntities()
        return true
    }

    getGroup(key) {
        if (!(key in this._groups)) {
            return null
        }
        return this._groups[key]
    }
    addGroup(newGroup) {
        const groupName = newGroup.getName()
        if (groupName in this._groups) {
            return false
        }
        this._groups[groupName] = newGroup
        this.preventTwoEntities()
        return true
    }
    removeGroup(key) {
        if (!(key in this._groups)) {
            return false
        }
        delete this._groups[key]
        return true
    }

    getPath(innerPath) {
        innerPath = innerPath || []
        innerPath.unshift(this)
        if (this._parent) {
            return this._parent.getPath(innerPath) // tail recursion
        } else {
            return innerPath
        }
    }
    DFS(doToEveryGroup) {
        const groups = [this]
        while(groups.length > 0) {
            const currGroup = groups.pop()
            doToEveryGroup(currGroup)
            groups.push(currGroup.getGroups())
        }
    }
    search(predicate) {
        const foundedGroups = []
        if (predicate(this)) {
            foundedGroups.push(this)
        }
        Object.keys(this._groups).forEach(key => {
            const result = this._groups[key].search(predicate)
            foundedGroups.push(...result)
        })
        return foundedGroups
    }
    flattening() {  // should be in reverse, delete also empty groups
        if (Object.keys(this._groups).length === 1) {
            const childKey = Object.keys(this._groups)[0]
            const childUsers = this._groups[childKey].getUsers()
            const childGroups = this._groups[childKey].getGroups()

            this.removeGroup(childKey)
            this.addUsers(childUsers)
            childGroups.forEach(group => this._groups[group.getName()] = group)

            this.flattening()
        }
        Object.keys(this._groups).forEach(key => {
            this._groups[key].flattening()
        })
    }
    toString() {
        return this._name + " (" + this._usersCount + ")"
    }

    removeUserFromAllGroups(username) {
        super.removeUser(username)
        Object.values(this._groups).forEach(group => group.removeUserFromAllGroups(username))
    }
    preventTwoEntities() {
        const groupsKeys = this.getGroupsKeys()
        if (groupsKeys.length) {
            const users = this.getUsers()
            if (users.length) {
                let othersGroup = this.getGroup('others')
                if (!othersGroup) {
                    othersGroup = new CompositeGroups('others', currGroup)
                    this.addGroup(othersGroup)
                }
                othersGroup.addUsers(users)
                this.removeAllUsers()
                console.log('User/s moved to group "others"')
            }
        }
    }
}

module.exports = CompositeGroup
