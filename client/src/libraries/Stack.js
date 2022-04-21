const StackNode = require('./StackNode')

class Stack {

    constructor() {
        this.length = 0
        this.top = null
    }

    getTop() {
        return this.top.value
    }

    push(data) {
        var node = new StackNode(data)
        this.length = this.length + 1
        if (this.top == null) {
            this.top = node
            node.next = null
            return
        }
        node.next = this.top
        this.top = node
    }

    pop() {

        if (this.length > 0) {
            this.length = this.length - 1
            var t = this.top
            this.top = this.top.next
            return t.data
        }

    }

    isEmpty() {
        return (this.length > 0) ? false : true
    }

    print() {
        var d = ""
        var i = this.top
        while (i != null) {
            d = d + i.data
            d = d + " -> "
            i = i.next
        }
        console.log(d)
    }

}

// var S = new Stack()
// S.push(1)
// S.push(11)
// S.push(111)
// S.push(1111)
// S.print()
// S.pop()
// S.print()
// S.pop()
// S.pop()
// S.pop()
// S.print()
module.exports = Stack