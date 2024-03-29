const User = require('../models/user')
const menuView = require('../views/menu-view')

class UsersController {
    constructor(users) {
        this._users = users

        this.listeners = {
            userDeleted: []
        }

        this._menu = {
            users: {
                title: 'Users',
                options: ['createNewUser', 'deleteUser', 'printUsers']
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

    getMenu() {
        return this._menu
    }

    createNewUser(callback) {
        const questions = [
            { question: 'Enter Username: ', type: 'string' },
            { question: 'Enter Password: ', type: 'string' },
            { question: 'Enter Age: ', type: 'number' }
        ]
        menuView.getInput(questions, answers => {
            const username = answers[0].trim()
            const password = answers[1].trim()
            const age = +answers[2]

            const newUser = new User(username, password, age)
            if (!this._users.addUser(newUser)) {
                console.log('User with that name Already Exists')
            }
            callback()
        })
    }

    deleteUser(callback) {
        const questions = [{ question: 'Enter Username: ', type: 'string' }]
        menuView.getInput(questions, answers => {
            const username = answers[0]

            if (this._users.deleteUser(username)) {
                this.trigger('userDeleted', username)
            } else {
                console.log('No user with that name')
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
