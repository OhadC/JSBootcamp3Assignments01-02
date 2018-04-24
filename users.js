import User from "./models/User";

function users() {
    const usersByName = {} // {name: user, name: user}

    crateUser = (name, password, age) => {
        if (!name in usersByName) {
            const newUser = new User(user, password, age)
            usersByName[name] = newUser
            return true
        }
        return false
    }

    updateUser = (oldName, newName, newAge) => {
        if (oldName in usersByName && !newName in usersByName) {
            usersByName[oldName].updateUser(newName, newAge)
            usersByName[newName] = usersByName[oldName]
            delete usersByName[oldName]
            // TODO: update groups
            return true
        }
        return false
    }

    deleteUser = (name) => {
        if (name in usersByName) {
            delete usersByName[name]
            // TODO: delete user from groups
            return true
        }
        return false
    }
}
