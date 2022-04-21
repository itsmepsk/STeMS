const express   =   require('express')
let router      =   express.Router()
const Database  =   require('../Database')
const db        =   new Database().connect()

router.get("/zones", (req, res) => {
    // console.log("in here")
    dbQuery = "SELECT * FROM zones"
    db.query(dbQuery, (error, response) => {
        res.send(response)
    })
})

router.get("/divisions", (req, res) => {
    var zone = req.query.zone
    dbQuery = "SELECT * FROM divisions where zone = ?"
    db.query(dbQuery, zone, (error, response) => {
        res.send(response)
    })
})

router.get("/signal_sections", (req, res) => {
    zone = req.query.zone
    division = req.query.division
    dbQuery = "SELECT * FROM section_list WHERE division = ? AND department > -1 ORDER BY section_name DESC";
    db.query(dbQuery, division, (err, response) => {
        res.send(response)
    })
})

router.get("/telecom_sections", (req, res) => {
    zone = req.query.zone
    division = req.query.division
    dbQuery = "SELECT * FROM section_list WHERE division = ? AND department < 1 ORDER BY section_name DESC";
    db.query(dbQuery, division, (err, response) => {
        res.send(response)
    })
})

router.get("/signal_stations", (req, res) => {
    section = JSON.parse(req.query.sections)
    if(section === "Select") {
        return 
    }
    dbQuery = "SELECT t1.id as id, t1.station_code as station_code, t1.station_name as station_name, t2.section_name FROM station_list_sig t1 LEFT JOIN section_list t2 ON t1.section = t2.id"
    if (section.length > 0) {
        // console.log("Inside isNaN")
        dbQuery = dbQuery + ` WHERE section IN (`
        dbQuery = dbQuery + section
        dbQuery = dbQuery + ")"
    }
    db.query(dbQuery, (err, response) => {
        res.send(response)
    })
})

router.get("/telecom_stations", (req, res) => {
    section = JSON.parse(req.query.sections)
    if(section === "Select") {
        return 
    }
    dbQuery = "SELECT t1.id as id, t1.station_code as station_code, t1.station_name as station_name, t2.section_name FROM station_list_tele t1 LEFT JOIN section_list t2 ON t1.section = t2.id"
    if (section.length > 0) {
        // console.log("Inside isNaN")
        dbQuery = dbQuery + ` WHERE section IN (`
        dbQuery = dbQuery + section
        dbQuery = dbQuery + ")"
    }
    db.query(dbQuery, (err, response) => {
        res.send(response)
    })
})

module.exports  =   router