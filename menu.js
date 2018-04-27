module.exports = menu = {
    main: [
        {
            name: 'Users',
            menu: 'users'
        }, {
            name: 'Groups',
            menu: 'groups'
        }, {
            name: 'Users to Groups association',
            menu: 'usersToGroups'
        }
    ],
    users: [
        {
            name: 'Create / delete users',
            menu: 'createOrDeleteUser'
        }, {
            name: 'Get a list of users in the system (list of usernames)',
            function: printUsers
        }
    ],
    createOrDeleteUser: [
        {
            name: 'Create user',
            function: createNewUser
        }, {
            name: 'Delete user',
            function: deleteUser
        }
    ],
    groups: [
        {
            name: 'Create / delete groups',
            menu: 'createOrDeleteGroups'
        }, {
            name: 'Get a list of groups in the system',
            function: printGroups
        }
    ],
    createOrDeleteGroups: [
        {
            name: 'Create group',
            function: createNewgroup
        }, {
            name: 'Delete group',
            function: deleteGroup
        }
    ],
    usersToGroups: [
        {
            name: 'Add / remove user to / from group',
            menu: 'addOrRemoveFromGroup'
        }, {
            name: 'Get a list of groups and users under each group',
            function: printGroupsAndUsers
        }
    ],
    addOrRemoveFromGroup: [
        {
            name: 'Add user to group',
            function: addUserToGroup
        }, {
            name: 'Remove user to group',
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
    users.map(user => console.log(user.name))
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
    groups.map(group => {
        console.log(group.name)
    })
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
    groups.map(group => {
        console.log(group.name)
        const groupUsers = group.getAllUsers()
        groupUsers.map(user => console.log('\t', user.name, '(' + user.age + ')'))
    })
    callback()
}