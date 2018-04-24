class Group{
    constructor(name){
        this.name = name
        this.usersList = {}
    }

    addUsers = (...users) => {
        for(let user in users){
            this.usersList[user.name] = user
        }
    }

    removeUsers = (...users) => {
        for(let user of users){
            if(this.usersList[user])
                delete this.usersList[user]
        }
    }
}
