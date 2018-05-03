const User = require('../models/user')
const menuView = require('../views/menu-view')

class UsersController {
    constructor(users) {
        this._users = users

        this.listeners = {
            userDeleted: []
        }

        this.menu = {
            users: {
                title: 'Users',
                options: ['createOrDeleteUser', 'printUsers']
            },
            createOrDeleteUser: {
                title: 'Create / delete users',
                options: ['createNewUser', 'deleteUser']
            },
            printUsers: {
                title: 'Get a list of users in the system (list of usernames)',
                function: this.printUsers.bind(this)
            },
            createNewUser: {
                title: 'Create user',
                function: this.createNewUser.bind(this)
            },
            deleteUser: {
                title: 'Delete user',
                function: this.deleteUser.bind(this)
            }
        }
    }

    createNewUser(callback) {
        const questionsArray = ['Enter Username: ', 'Enter Password: ', 'Enter Age: ']
        menuView.getInput(questionsArray, answers => {
            const username = answers[0]
            const password = answers[1]
            const age = answers[2]
            if (!this._validateUser(username, password, age)) {
                this.createNewUser(callback)
            }
            else {
                const newUser = new User(username, password, parseInt(age))
                this._users.addUser(newUser)
                callback()
            }
        })
    }

    deleteUser(callback) {
        const questionsArray = ['Enter Username: ']
        menuView.getInput(questionsArray, answers => {
            const username = answers[0]
            if (this._users.deleteUser(username)) {
                this.trigger('userDeleted', username)
            }
            callback()
        })
    }

    printUsers(callback) {
        const users = this._users.getUsers()
        console.log()
        if (!users.length) {
            console.log('There is no users')
        } else {
            users.forEach(user => {
                console.log(user.getName())
            })
        }
        console.log()
        callback()
    }

    _validateUser(username, password, age) {
        console.log()
        if (!username.trim()) {
            console.log('You must enter User name')
            return false
        }
        if (!password.trim()) {
            console.log('You must enter Password')
            return false
        }
        if (!age.trim()) {
            console.log('You must enter Age')
            return false
        }
        if (!this._isInteger(age.trim())) {
            console.log('Age must be a number')
            return false
        }
        return true
    }

    _isInteger(value) {
        return /^\d+$/.test(value)
    }

    on(eventName, handler) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].push(handler)
        } else {
            this.listeners[eventName] = handler
        }
    }

    trigger(eventName, data) {
        if (this.listeners[eventName] && this.listeners[eventName].length) {
            this.listeners[eventName].forEach(handler => {
                if (!!handler && typeof handler === 'function') {
                    handler(data)
                }
            })
        }
    }
}

module.exports = UsersController 
