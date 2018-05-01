module.exports.NTree = class NTree {
    constructor() {
        this._roots = []
    }
}

module.exports.Node = class Node {
    constructor(data, parent) {
        this._data = data
        this._parent = parent
        this._childs = []
    }

    getData() {
        return this._data
    }
    setData(newData) {
        this._data = newData
    }
    getParent() {
        return this._parent
    }
    setParent(newParent) {
        this._parent = newParent
    }
    getCilds() {
        return this._childs
    }

    addChild(newChild) {
        this._childs.push(newChild)
    }
    removeChilds(callback) {
        this._childs = this._childs.filter(child => !callback(child))
    }
}