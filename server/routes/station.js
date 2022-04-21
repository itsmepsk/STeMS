const express       =   require('express')
const bodyParser    =   require('body-parser')
const cors          =   require('cors')
const app           =   express()
const fs            =   require('fs');
//  Contains all the required columns to be fetched from Database.
const file          =   require("../JSON/StationQueryJSON.json")
const Database      =   require('../Database');    //  Class to create Database connection.
let router          =   express.Router()

var db = new Database().connect()   //  Database Object.
var id = null                       //  id of the station whose details are to be fetched. 

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
                                        //  theStationQueryJSON.json file.
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

router.get("/stations_general", (req, res) => {

    id = req.query.id
    if (! isNumeric(id)) {
        getStationIDFromCode(id, executeStationGeneral)
    }
    else {
        executeStationGeneral()
    }

    function executeStationGeneral() {
        var column = "station_id"; 
        var table1 = "station_list_sig"
        var table2 = "stations_general"
        var queryJSON = file['stations_general']
        var dbQuery = queryGenerator(queryJSON)
        dbQuery = dbQuery + "FROM " + table1 + " t1 " + " RIGHT JOIN " + table2 + " t2 "
        dbQuery = dbQuery + "ON t1.id = t2.station_id WHERE "
        dbQuery = dbQuery + column + " = ?"

        db.query(dbQuery,id, (err, response) => {
            res.send(response)
        })
    }
    
})

router.get("/stations_signal_basic", (req, res) => {
    
    id = req.query.id
    if (! isNumeric(id)) {
        getStationIDFromCode(id, executeStationSignalBasic)
    }
    else {
        executeStationSignalBasic()
    }

    function executeStationSignalBasic() {
        var table = "stations_signal_basic"
        var queryJSON = file['stations_signal_basic']
        var dbQuery = queryGenerator(queryJSON)
        dbQuery = dbQuery + "FROM " + table + " WHERE station_id = ? "

        db.query(dbQuery, id, (err, response) => {
            res.send(response)
        })
    }
})

router.get("/stations_track_circuit", (req, res) => {
    id = req.query.id
    if (! isNumeric(id)) {
        getStationIDFromCode(id, executeStationTrackCircuit)
    }
    else {
        executeStationTrackCircuit()
    }

    function executeStationTrackCircuit() {
        var table = "stations_track_circuits"
        var queryJSON = file['stations_track_circuits']
        var dbQuery = queryGenerator(queryJSON)
        dbQuery = dbQuery + "FROM " + table + " WHERE station_id = ? "

        db.query(dbQuery, id, (err, response) => {
            res.send(response)
        })
    }
})

router.get("/stations_documents_available", (req, res) => {
    id = req.query.id
    if (! isNumeric(id)) {
        getStationIDFromCode(id, executeStationDocumentsAvailable)
    }
    else {
        executeStationDocumentsAvailable()
    }

    function executeStationDocumentsAvailable() {
        var table = "stations_documents_available"
        var queryJSON = file['stations_documents_available']
        var dbQuery = queryGenerator(queryJSON)
        dbQuery = dbQuery + "FROM " + table + " WHERE station_id = ? "
        
        db.query(dbQuery, id, (err, response) => {
            res.send(response)
        })
    }
})

router.get("/stations_points", (req, res) => {
    id = req.query.id
    if (! isNumeric(id)) {
        getStationIDFromCode(id, executeStationPoints)
    }
    else {
        executeStationPoints()
    }

    function executeStationPoints() {
        var table = "stations_points"
        var queryJSON = file['stations_points']
        var dbQuery = queryGenerator(queryJSON)
        dbQuery = dbQuery + "FROM " + table + " WHERE station_id = ? "
        console.log(dbQuery)
        db.query(dbQuery, id, (err, response) => {
            console.log(response)
            res.send(response)
        })
    }

})

module.exports  =   router