const mysql = require('mysql')
const file = require("./JSON/dbParamaters.json")
const fs = require("fs")

class Database{
    constructor() {
        
    }

    readParams() {
        const db = mysql.createPool({
            host: file.host,
            database: file.database,
            user: file.user,
            password: file.password
        })
        return db
    }

    connect() {
        return this.readParams()
    }

 }



module.exports = Database