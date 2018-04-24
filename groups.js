import Group from "./models/Group";

function groups() {
    const groupsByName = {} // {name: group, name: group}

    createGroup = (name) => {
        if (!name in groupsByName) {
            const newGroup = new Group(name)
            groupsByName[name] = newGroup
            return true
        }
        return false
    }

    deleteGroup = (name) => {
        if (name in groupsByName) {
            delete groupsByName[name]
            return true
        }
        return false
    }

    addUsersToGroup = (groupName, ...usersObj) => {
        groupsByName[groupName].addUsers(...usersObj)
    }

    removeUsersFromGroup = (groupName, ...usersObj) => {
        groupsByName[groupName].removeUsers(...usersObj)
    }
}
