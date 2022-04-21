const express       =   require('express')
const bodyParser    =   require('body-parser')
const cors          =   require('cors')
const app           =   express()
const fs            =   require('fs')
const file          =   require("../JSON/assetsQueryJSON.json")
const Database      =   require('../Database');    //  Class to create Database connection.
const { response } = require('express')
let router          =   express.Router()

var db = new Database().connect()  
// console.log(db)
var id = null

function isNumeric(n, callback) {   //  Checks if the HTTP parameter passed is a number or not.
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getStationIDFromCode(code, callback) { //  Gets the id of station given its station code.
    var x = "'" + code + "'"
    dbQuery = "SELECT id FROM station_list_sig WHERE station_code = " + x

    db.query(dbQuery, (err, response) => {
        id = response[0].id     //  Response is an array of size 1 with object having id as property.
        callback()
    })
}

function queryGenerator(queryJSON) {    //  Generates SQL query from JSON object which is read from 
                                        //  assetsQueryJSON.json file.
    var dbQuery = "SELECT "
    Object.entries(queryJSON).map(([key, value], index) => {
        dbQuery = dbQuery + key + " as " + value
        if (index < Object.keys(queryJSON).length - 1) {
            dbQuery = dbQuery + " , "
        }
        else {
            dbQuery = dbQuery + " "
        }
    })
    return dbQuery

}

router.get("/list", (req, res) => {
    dbQuery = "SELECT url_name, display_name FROM list_of_list"
    db.query(dbQuery, (err, response) => {
        console.log(response)
        res.send(response)
    })
})

router.get("/points", (req, res) => {
    id = req.query.id
    if (! isNumeric(id)) {
        getStationIDFromCode(id, executePoints)
    }
    else {
        executePoints()
    }

    function executePoints() {
        var queryJSON = file['points']
        dbQuery = queryGenerator(queryJSON)
        dbQuery = dbQuery + "FROM points_list WHERE station = ? "
        db.query(dbQuery, id, (err, response) => {
            // console.log(err)
            res.send(response)
        })
    }
})

router.get("/tracks", (req, res) => {
    console.log("inside tracks router")
    id = req.query.id
    if (! isNumeric(id)) {
        getStationIDFromCode(id, executePoints)
    }
    else {
        executeTrackCircuits()
    }

    function executeTrackCircuits() {
        var queryJSON = file['tracks']
        dbQuery = queryGenerator(queryJSON)
        dbQuery = dbQuery + "FROM track_circuit_list WHERE station = ? "
        db.query(dbQuery, id, (err, response) => {
            console.log(err)
            res.send(response)
        })
    }
})

module.exports  =   router