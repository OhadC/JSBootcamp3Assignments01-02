function runMenu(menuObj, rl, db, currMenu) {
    const currMenuObj = menuObj[currMenu || 'main']
    rl.question(createMenuQuestion(currMenuObj), answer => {
        answer = +answer
        if (!answer || answer <= 0 || answer > currMenuObj.length) {
            console.log('Wrong input! Try again:')
            runMenu(menuObj, rl, db, currMenu)
        } else {
            const selectdMenu = currMenuObj[answer - 1]
            console.log(selectdMenu.title)

            if ('nextMenu' in selectdMenu) {
                runMenu(menuObj, rl, db, selectdMenu.nextMenu)
            } else {
                selectdMenu.function(rl, db, () => runMenu(menuObj, rl, db))
            }
        }
    })
}

function createMenuQuestion(menu) {
    return menu.reduce((prevStr, choice, index) => {
        return prevStr + '[' + (index + 1) + '] ' + choice.title + '\n'
    }, '')
}

const menu = {
    main: [
        {
            title: 'Users',
            nextMenu: 'users'
        }, {
            title: 'Groups',
            nextMenu: 'groups'
        }, {
            title: 'Users to Groups association',
            nextMenu: 'usersToGroups'
        }
    ],
    users: [
        {
            title: 'Create / delete users',
            nextMenu: 'createOrDeleteUser'
        }, {
            title: 'Get a list of users in the system (list of usernames)',
            function: printUsers
        }
    ],
    createOrDeleteUser: [
        {
            title: 'Create user',
            function: createNewUser
        }, {
            title: 'Delete user',
            function: deleteUser
        }
    ],
    groups: [
        {
            title: 'Create / delete groups',
            nextMenu: 'createOrDeleteGroups'
        }, {
            title: 'Get a list of groups in the system',
            function: printGroups
        }
    ],
    createOrDeleteGroups: [
        {
            title: 'Create group',
            function: createNewgroup
        }, {
            title: 'Delete group',
            function: deleteGroup
        }
    ],
    usersToGroups: [
        {
            title: 'Add / remove user to / from group',
            nextMenu: 'addOrRemoveFromGroup'
        }, {
            title: 'Get a list of groups and users under each group',
            function: printGroupsAndUsers
        }
    ],
    addOrRemoveFromGroup: [
        {
            title: 'Add user to group',
            function: addUserToGroup
        }, {
            title: 'Remove user to group',
            function: removeUserFromGroup
        }
    ]
}

function createNewUser(rl, db, callback) {
    rl.question('Enter Username: \n', (username) => {
        rl.question('Enter Password: \n', (password) => {
            rl.question('Enter Age: \n', (age) => {
                db.users.createUser(username, password, age)
                callback()
            })
        })
    })
}

function deleteUser(rl, db, callback) {
    rl.question('Enter Username: \n', (username) => {
        if (db.users.deleteUser(username)) {
            db.groups.removeUserFromAllGroups(username) // ? console.log("Success!") : console.log("something went wrong!   ********")
        }
        callback()
    })
}

function printUsers(rl, db, callback) {
    const users = db.users.getAllUsers()
    users.forEach(user => console.log(user.name))
    callback()
}

function createNewgroup(rl, db, callback) {
    rl.question('Enter group name: \n', (groupName) => {
        db.groups.createGroup(groupName) // ? console.log("Success!") : console.log("something went wrong!   ********")
        callback()
    })
}

function deleteGroup(rl, db, callback) {
    rl.question('Enter group name: \n', (groupName) => {
        db.groups.deleteGroup(groupName) // ? console.log("Success!") : console.log("something went wrong!   ********")
        callback()
    })
}

function printGroups(rl, db, callback) {
    const groups = db.groups.getAllGroups()
    groups.forEach(group =>  console.log(group.name))
    callback()
}

function addUserToGroup(rl, db, callback) {
    rl.question('Enter username: \n', (username) => {
        rl.question('Enter group name: \n', (groupName) => {
            const user = db.users.getUser(username)
            if (user) {
                db.groups.addUserToGroup(groupName, user) // ? console.log("Success!") : console.log("something went wrong!   ********")
            }
            callback()
        })
    })
}

function removeUserFromGroup(rl, db, callback) {
    rl.question('Enter username: \n', (username) => {
        rl.question('Enter group name: \n', (groupName) => {
            db.groups.removeUserFromGroup(groupName, username) // ? console.log("Success!") : console.log("something went wrong!   ********")
            callback()
        })
    })
}

function printGroupsAndUsers(rl, db, callback) {
    const groups = db.groups.getAllGroups()
    groups.forEach(group => {
        console.log(group.name)
        const groupUsers = group.getAllUsers()
        groupUsers.forEach(user => console.log('\t', user.name, '(' + user.age + ')'))
    })
    callback()
}

module.exports = { runMenu, menu }
