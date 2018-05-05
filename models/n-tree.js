class Node {
    constructor(data, parent) {
        this._data = data
        this._parent = parent || null
        this._childrens = {}
    }

    getData() {
        return this._data
    }
    setData(newData) {
        this._data = newData
        return true
    }
    getParent() {
        return this._parent
    }
    getChildrens() {
        return Object.values(this._childrens)
    }
    getChildrensKeys() {
        return Object.keys(this._childrens)
    }

    getChildren(key) {
        if (!(key in this._childrens)) {
            return null
        }
        return this._childrens[key]
    }
    addChildren(key, newChildren) {
        if (key in this._childrens) {
            return false
        }
        this._childrens[key] = newChildren
        return true
    }
    removeChildren(key) {
        if (!(key in this._childrens)) {
            return false
        }
        delete this._childrens[key]
        return true
    }
    getPath(childrensPath) {
        if (!childrensPath) {
            childrensPath = []
        }
        const newPath = [...childrensPath, this]
        if (this._parent) {
            return this.getPath(newPath) // tail recursion
        } else {
            return newPath
        }
    }
    search(comparator) {
        const foundedNodes = []
        if (comparator(this)) {
            foundedNodes.push(this)
        }
        Object.keys(this._childrens).forEach(key => {
            const result = this._childrens[key].search(comparator)
            foundedNodes.push(...result)
        })
        return foundedNodes
    }
    flattening(flatteningStrategy) {
        if (this._childrens.length === 1) {
            flatteningStrategy(this)
            this.flattening(flatteningStrategy)
        }
        Object.keys(this._childrens).forEach(key => {
            flattening(flatteningStrategy, this._childrens[key])
        })
    }
}

module.exports = Node
