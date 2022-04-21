
class TreeNode {

    constructor(dat) {
        this.value = dat
        this.children = new Map()
        this.level = 0
    }

    // addChild(child) {
    //     this.children.push(child)
    // }

    // createTree(data) {

        

    // }

    // traverseTree(tree) {
    //     var Q = new Queue()
    //     Q.push(tree)
    //     var counter = 1
    //     var brr = new Array()
    //     while (! Q.isEmpty()) {
    //         var str = ""
    //         var arr = Q.top.data
    //         var lvl = arr.level + 1
    //         var p = Q.pop().data
    //         var x = '\u00A0'.repeat(3*p.level)
    //         console.log(x + p.value)
    //         str = x+p.value
    //         brr.push(str)
    //         arr.children.map(x => {
    //             x.level = lvl
    //             Q.push(x)
    //         })
    //         counter = counter + 1

    //     }
    //     return brr
    // }

}

// var tree = new TreeNode("Sr.DSTE/M/GTL")
// tree.addChild(new TreeNode("DSTE/SW/GTL"))
// tree.addChild(new TreeNode("DSTE/RU"))
// tree.addChild(new TreeNode("ADSTE/PAK"))
// tree.addChild(new TreeNode("ADSTE/HX"))
// tree.addChild(new TreeNode("ADSTE/RC"))
// tree.addChild(new TreeNode("ADSTE/GTL"))
// // tree.children.set(2, new TreeNode(5))
// // tree.children.set(2, new TreeNode(6))
// tree.children[2].addChild(new TreeNode("SSE/SIG/PAK"))
// tree.children[2].addChild(new TreeNode("SSE/TELE/PAK"))
// tree.children[2].children[0].addChild(new TreeNode("JE/SIG/PAK"))
// tree.children[2].children[0].addChild(new TreeNode("JE/SIG/CTO"))
// // tree.children[1].addChild(new TreeNode(8))
// // tree.children[2].addChild(new TreeNode(9))
// // tree.children[2].addChild(new TreeNode(10))
// // tree.traverseTree(tree)

module.exports = TreeNode