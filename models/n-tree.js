module.exports.NTree = class NTree {
    constructor() {
        this._roots = []
    }

    getToots() {
        return this._roots
    }

    addToRoot(nodeToAdd) {
        this._roots.push(nodeToAdd)
    }
    search(comparator, currNode) {
        const foundedNodes = []
        let currNodeChilds
        if (currNode) {
            currNodeChilds = currNode.getCilds()
            if (comparator(currNode)){
                foundedNodes.push(currNode)
            }
        } else {
            currNodeChilds = this._roots
        }
        
        for (let i = 0; i < currNodeChilds.length; i++) {
            const result = search(currNodeChilds[i])
            foundedNodes.push(...result)
        }
        return foundedNodes
    }
    flattening(currNode) {
        let currNodeChilds
        if (!currNode) {
            currNodeChilds = this._roots
        } else {
            const currNodeChilds = currNode.getCilds()
        }
        currNodeChilds.forEach(child => {
            flattening(child)
            child.flattening()  // TODO: should get from outside
        })
    }
}

module.exports.Node = class Node {
    constructor(data, parent) {
        this._data = data // Group
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
    removeChilds(comparator) {
        this._childs = this._childs.filter(child => !comparator(child))
    }
    getPathToNode(childsPath) {
        if (!childsPath) {
            childsPath = []
        }
        const newPath = [...childsPath, this]
        if (this._parent) {
            return this.getPathToNode(newPath)
        } else {
            return newPath
        }
    }
    flattening() {  // TODO: should be in controller
        if (this._childs.length === 1 && this._childs[0].getCilds().length === 0) {
            const nodeToDelete = this._childs[0]
            const usersToAdd = nodeToDelete.getData().getUsers()
            this._data.push(...usersToAdd)
        }
    }
}