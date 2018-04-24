export default class Group {
    id = 0

    constructor(name) {
        this.id = id++
        this.name = name
        this.usersList = {} // {id: user, id: user}
    }

    addUsers = (usersObjArr) => {
        for (let user in usersObjArr) {
            this.usersList[user.id] = user
        }
    }

    removeUsers = (usersObjArr) => {
        for (let user of usersObjArr) {
            if (this.usersList[user.id])
                delete this.usersList[user.id]
        }
    }
}
