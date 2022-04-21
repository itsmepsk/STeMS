const QueueNode = require("./QueueNode")

class Queue {

    constructor() {
        
        this.front = null
        this.back = null
        this.length = 0

    }

    getFront() {
        return this.front.data
    }

    getBack() {
        return this.back.data
    }

    push(value) {
        var node = new QueueNode(value)
        this.length = this.length + 1
        if (this.front == null) {
            this.front = node
            this.back = node
            return
        }
        node.next = this.back
        this.back.prev = node
        node.prev = null
        this.back = node

    }

    pop() {

        if (this.length > 0) {

            var t = this.front
            this.front = this.front.prev
            if (this.length === 1) {
                this.front = null
                this.back = null
            }
            else {
                this.front.next = null
            }
            this.length = this.length - 1
            return t.data

        }

    }

    peek() {

        return this.front

    }

    print() {
        var d = ""
        var i = this.front
        while (i != null) {
            d = d + i.data.data.id
            d = d + " -> "
            i = i.prev
        }
        console.log(d)
    }

    printReverse() {
        var d = ""
        var i = this.back
        while (i != null) {
            d = d + i.data
            d = d + " -> "
            i = i.next
        }
        console.log(d)
    }


    length() {

        return this.length

    }

    isEmpty() {
        return (this.length > 0) ? false : true
    }

}

// var Q = new Queue()
// Q.push(1)
// Q.print()
// Q.printReverse()
// Q.push(2)
// Q.print()
// Q.printReverse()
// Q.push(3)
// Q.print()
// Q.printReverse()
// Q.push(4)
// Q.print()
// Q.printReverse()


module.exports = Queue