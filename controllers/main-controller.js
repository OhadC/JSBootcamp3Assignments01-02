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

        this._menu = {
            main: {
                title: 'Main menu',
                options: ['users', 'groups', 'usersToGroups']
            },
            ...this._usersController.getMenu(),
            ...this._groupsController.getMenu()
        }

        this._addOptionsToMenu()
    }

    init() {
        this.showMenu()
    }

    showMenu(currMenu) {
        currMenu = currMenu || 'main'
        const currMenuObj = this._menu[currMenu]
        const optionsTitles = currMenuObj.options.map(option => this._menu[option].title)
        console.log('===', currMenuObj.title, '===')
        menuView.chooseOne(optionsTitles, optionIndex => {
            this.handleInput(currMenu, optionIndex)
        })
    }

    handleInput(currMenu, optionIndex) {
        const currMenuObj = this._menu[currMenu]
        const selectedMenu = currMenuObj.options[optionIndex]
        const selectedMenuObj = this._menu[selectedMenu]

        if ('options' in selectedMenuObj) {
            this.showMenu(selectedMenu)
        } else {
            selectedMenuObj.function(this.showMenu.bind(this))
        }
    }

    _addOptionsToMenu() {
         this._menu['exit'] = {
            title: 'Exit',
            function: () => process.exit()
        }
        for (const menuName in  this._menu) {
            if (menuName === 'main') {
                 this._menu[menuName].options.push('exit')
            } else if ('options' in  this._menu[menuName]) {
                 this._menu[menuName].options.push('main')
            }
        }
    }
}
