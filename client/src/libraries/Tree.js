const Queue = require('./Queue')
const TreeNode = require('./TreeNode')

class Tree {

    constructor() {

        this.root = null

    }

    addNode(parent, node) {

        var newNode = new TreeNode(node)
        console.log(newNode)
        if (this.root == null) {
            this.root = newNode
            return
        }
        if (this.root.value.id === parent) {
            this.root.children.set(node.id, newNode)
            return
        }
        else {
            var Q = new Queue()
            Q.push(this.root)
            while(! Q.isEmpty()) {
                console.log("Hheeehhhehhaaahhaaa")
                var f = Q.getFront()
                console.log(f)
                if (f.children.has(parent)) {
                    var tempNode = f.children.get(parent)
                    tempNode.children.set(node.id, newNode)
                    f.children.set(parent, tempNode)
                }
                else {
                    console.log("Lalalalalaleyolalala")
                    // var f = Q.getFront()
                    console.log(f.children)
                    if (f.children.size > 0) {
                        f.children.forEach(function(value, key){
                            console.log("Wheeeee")
                            console.log("Key = "+key)
                            console.log("value = "+value)
                            Q.push(value)
                        })
                    }
                }
                console.log(Q.pop())
            }
        }

    }
}

// var T = new Tree()
// T.addNode(null, {id: 1, name: "Prathamesh"})
// T.addNode(1, {id: 2, name: "Shubhra"})
// T.addNode(1, {id: 3, name: "Shrabani"})
// T.addNode(1, {id: 4, name: "Anwesa"})
// T.addNode(4, {id: 5, name: "Massakali"})
// T.addNode(5, {id: 6, name: "Matakali"})
// console.log(T)

module.exports = Tree