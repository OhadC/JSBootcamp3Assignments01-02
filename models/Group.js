export default class Group {
    id = 0

    constructor(name) {
        this.id = id++
        this.name = name
        this.usersList = {} // {id: user, id: user}
    }

    addUsers = (...usersObj) => {
        for (let user in usersObj) {
            this.usersList[user.id] = user
        }
    }

    removeUsers = (...usersObj) => {
        for (let user of usersObj) {
            if (this.usersList[user.id])
                delete this.usersList[user.id]
        }
    }
}
