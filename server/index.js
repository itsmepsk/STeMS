const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const station_list = require("./routes/StationList")
const station   =   require("./routes/station")
const assets    =   require("./routes/assets")
const app = express()


app.use(cors())
app.use("/station_list", station_list)      // Create a Modular Router for Station Lists. 
app.use("/station", station)                // Create a Modular Router for a particular Station.
app.use("/assets", assets)                 // Create a Modular Router for listing selected assets of a station.

app.listen(4001, () => {
    console.log("Listening port 4001")
})