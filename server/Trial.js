const Queue = require("./Queue")

Q = new Queue()
console.log(Q.isEmpty())
Q.push(1)
// console.log(Q.peek())
Q.push(2)
// console.log(Q.peek())
Q.push(3)
// console.log(Q.peek())
Q.push(4)
// console.log(Q.peek())
// console.log(Q.length)

Q.pop()
Q.print()
console.log(Q.isEmpty())