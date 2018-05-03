const User = require('../models/user')
const menuView = require('../views/menu-view')

class UsersController {
    constructor(users) {
        this._users = users

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
            this._validateUser(username, password, age)
            const newUser = new User(username, password, parseInt(age))
            this._users.addUser(newUser)
            callback()
        })
    }

    deleteUser(callback) {
        const questionsArray = ['Enter Username: ']
        menuView.getInput(questionsArray, answers => {
            const username = answers[0]
            this._users.deleteUser(username)
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
        if (!username.trim()) {
            throw new Error('You must enter User name')
        }
        if (!password.trim()) {
            throw new Error('You must enter Password')
        }
        if (!age.trim()) {
            throw new Error('You must enter Age')
        }
        if (!this._isInteger(age.trim())) {
            throw new Error('Age must be a number')
        }
    }
    _isInteger(value) {
        return /^\d+$/.test(value);
    }
}

module.exports = UsersController 
