const Group = require('./group')

class CompositeGroup extends Group {
    constructor(name, parent) {
        super(name)
        this._parent = parent || null
        this._groups = {}
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
            return this.getPath(innerPath) // tail recursion
        } else {
            return innerPath
        }
    }
    search(comparator) {
        const foundedGroups = []
        if (comparator(this)) {
            foundedGroups.push(this)
        }
        Object.keys(this._groups).forEach(key => {
            const result = this._groups[key].search(comparator)
            foundedGroups.push(...result)
        })
        return foundedGroups
    }
    flattening(){
        if (this._groups.length === 1) {
            flatteningStrategy(this)
            this.flattening(flatteningStrategy)
        }
        Object.keys(this._groups).forEach(key => {
            this._groups[key].flattening()
        })
    }

    removeUserFromAllGroups(username) {
        super.removeUser(username)
        this._groups.forEach(group => group.removeUserFromAllGroups(user))
    }
}

module.exports = CompositeGroup
