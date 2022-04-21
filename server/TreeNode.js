const Queue = require("./Queue")

class TreeNode {

    constructor(dat) {
        this.value = dat
        this.children = []
        this.level = 0
    }

    addChild(child) {
        this.children.push(child)
    }

    traverseTree(tree) {
        var Q = new Queue()
        Q.push(tree)
        var counter = 1
        while (! Q.isEmpty() && counter <= 10) {

            var arr = Q.top.data
            var lvl = arr.level + 1
            var p = Q.pop().data
            var x = "|" + "-".repeat(p.level)
            console.log(x + p.value)
            arr.children.map(x => {
                x.level = lvl
                Q.push(x)
            })
            counter = counter + 1

        }
    }

}

// var tree = new TreeNode(1)
// tree.addChild(new TreeNode(2))
// tree.addChild(new TreeNode(3))
// tree.addChild(new TreeNode(4))
// tree.children[0].addChild(new TreeNode(5))
// tree.children[0].addChild(new TreeNode(6))
// tree.children[1].addChild(new TreeNode(7))
// tree.children[1].addChild(new TreeNode(8))
// tree.children[2].addChild(new TreeNode(9))
// tree.children[2].addChild(new TreeNode(10))
// tree.traverseTree(tree)

module.exports = TreeNode