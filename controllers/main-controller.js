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
            ...this._usersController.menu,
            ...this._groupsController.menu
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
        const selectedMenu = currMenuObj.options[optionIndex]
        const selectedMenuObj = menuObj[selectedMenu]

        if ('options' in selectedMenuObj) {
            this.showMenu(selectedMenu, menuObj)
        } else {
            selectedMenuObj.function(this.showMenu.bind(this))
        }
    }
}
