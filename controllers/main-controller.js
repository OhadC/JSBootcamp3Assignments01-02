const Users = require('../models/users')
const Groups = require('../models/groups')
const UsersController = require('./users-controller')
const GroupsController = require('./groups-controller')
const menuView = require('../views/menu-view')

module.exports = class MainController {
    constructor() {
        this._users = new Users()
        this._groups = new Groups()
        this._usersController = new UsersController(this._users) // need to get view - does it really have to..?
        this._groupsController = new GroupsController(this._users, this._groups)

        this.menu = {
            main: {
                title: 'Main menu',
                options: ['users', 'groups', 'usersToGroups']
            },
            users: {
                title: 'Users',
                function: () => { this.showMenu('users', this._usersController.menu) }
            },
            groups: {
                title: 'Groups',
                function: () => { this.showMenu('groups', this._groupsController.menu) }
            },
            usersToGroups: {
                title: 'Users to Groups association',
                function: () => { this.showMenu('usersToGroups', this._groupsController.menu) }
            }
        }
    }

    init() {
        this.showMenu()
    }

    showMenu(currMenu, menuObj) {
        currMenu = currMenu || 'main'
        menuObj = menuObj || this.menu
        menuView.printMenu(currMenu, menuObj, answer => {
            this.handleInput(currMenu, menuObj, answer)
        })
    }

    handleInput(currMenu, menuObj, answer) {
        const currMenuItem = menuObj[currMenu]
        answer = +answer
        if (!answer || answer <= 0 || answer > currMenuItem.options.length) {
            console.log('Wrong input! Try again:')
            this.showMenu(currMenu, menuObj)
        } else {
            const selectdMenu = currMenuItem.options[answer - 1]
            const selectdMenuItem = menuObj[selectdMenu]

            if ('options' in selectdMenuItem) {
                this.showMenu(selectdMenu, menuObj)
            } else {
                selectdMenuItem.function(this.showMenu.bind(this))
            }
        }
    }
}
