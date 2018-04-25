const readline = require('readline')
const db = require('./db')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const createUserMenu = {
    question: 'enter username: ',
    callback: name => {
        controller.state.name = name
        controller.state.currentMenu = createUserMenu.enterPassword
        controller.run()
    },
    enterPassword: {
        question: 'enter password: ',
        callback: password => {
            controller.state.password = password
            controller.state.currentMenu = createUserMenu.enterAge
            controller.run()
        }
    },
    enterAge: {
        question: 'enter age: ',
        callback: age => {
            controller.state.age = age

            db.users.createUser(controller.state.name, controller.state.password, controller.state.age)

            controller.state.currentMenu = mainMenu
            controller.run()
        }
    }
}

const deleteUserMenu = {
    question: 'enter username: ',
    callback: name => {

        db.users.deleteUser(name)

        controller.state.currentMenu = mainMenu
        controller.run()
    },
}

const createOrDeleteUserMenu = {
    question: '1. Create  user \n' +
        '2. Delete user \n',
    callback: answer => {
        switch (+answer) {
            case 1:
                controller.state.currentMenu = createUserMenu
                break
            case 2:
                controller.state.currentMenu = deleteUserMenu
                break
        }
        controller.run()
    }
}

const usersMenu = {
    question: '1. Create / delete users \n' +
        '2. Get a list of users in the system (list of usernames) \n',
    callback: answer => {
        switch (+answer) {
            case 1:
                controller.state.currentMenu = createOrDeleteUserMenu
                break
            case 2:
                console.log(db.users.getAllUserNames().reduce(((acc, name) => acc + ", " + name), "").substring(0, 2))

                controller.state.currentMenu = mainMenu
                break
        }
        controller.run()
    }
}

const groupsMenu = {
    question: '1. Create / delete groups \n' +
        '2. Get a list of groups in the system',
    callback: answer => {
        switch (+answer) {
            case 1:

                break
            case 2:
                console.log(db.groups.getAllGroupsNames().reduce(((acc, name) => acc + ", " + name), "").substring(0, 2))

                controller.state.currentMenu = mainMenu
                break
        }
        controller.run()
    }
}

const mainMenu = {
    question: '1. Users \n' +
        '2. Groups \n' +
        '3. Users to Groups association \n',
    callback: answer => {
        switch (+answer) {
            case 1:
                controller.state.currentMenu = usersMenu
                break
            case 2:
                controller.state.currentMenu = groupsMenu
                break
            case 3:
                controller.state.currentMenu = usersToGroupsMenu
                break
        }
        controller.run()
    }
}

const controller = {
    run: () => {
        rl.question(controller.state.currentMenu.question, controller.state.currentMenu.callback)
    },
    state: {
        currentMenu: mainMenu
    }
}

module.exports = controller
