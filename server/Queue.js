const QueueNode = require("./QueueNode")

class Queue {

    constructor() {
        
        this.top = null
        this.length = 0

    }
    

    push(value) {

        var node = new QueueNode(value)
        node.next = this.top
        this.top = node
        this.length = this.length + 1

    }

    pop() {

        if (this.length > 0) {

            var t = this.top
            this.top = this.top.next
            this.length = this.length - 1
            return t

        }

    }

    peek() {

        return this.top

    }

    print() {

        var i = this.top
        while (i != null) {
            console.log(i.data)
            i = i.next
        }

    }

    length() {

        return this.length

    }

    isEmpty() {

        return (this.length > 0) ? false : true

    }

}

module.exports = Queue