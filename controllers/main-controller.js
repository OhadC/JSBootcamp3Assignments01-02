const Node = require('../models/n-tree')
const Group = require('../models/group')
const Users = require('../models/users')
const Groups = require('../models/groups')
const UsersController = require('./users-controller')
const GroupsController = require('./groups-controller')
const menuView = require('../views/menu-view')

module.exports = class MainController {
    constructor() {
        this._users = new Users()
        this._groups = new Groups()
        this._root = new Node(new Group())
        this._usersController = new UsersController(this._users)
        this._groupsController = new GroupsController(this._root, this._users, this._groups, this._usersController)

        this.currNode = this._root

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
        const currMenuObj = menuObj[currMenu]
        const optionsTitles = currMenuObj.options.map(option => menuObj[option].title)
        console.log('===', currMenuObj.title, '===')
        menuView.chooseOne(optionsTitles, optionIndex => {
            this.handleInput(currMenu, menuObj, optionIndex)
        })
    }

    handleInput(currMenu, menuObj, optionIndex) {
        const currMenuObj = menuObj[currMenu]
        const selectdMenu = currMenuObj.options[optionIndex]
        const selectdMenuObj = menuObj[selectdMenu]

        if ('options' in selectdMenuObj) {
            this.showMenu(selectdMenu, menuObj)
        } else {
            selectdMenuObj.function(this.showMenu.bind(this))
        }

    }
}
