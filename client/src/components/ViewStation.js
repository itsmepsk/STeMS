import React, {Component} from 'react'
import Helmet from 'react-helmet'
import StationTabularData from './StationTabularData'
import { Grid, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import Axios from 'axios'
import { Select } from '@material-ui/core'
import { Link } from 'react-router-dom'

const title = "View Station"

var  host = window.location.hostname
host = "http://" + host
const serverPort = 4001
const serverURL = host + ":" + serverPort

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    top: {
        margin: 0,
        width: "100%",
        marginTop: "64px"
    }
  });

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

class ViewStation extends Component {
    constructor() {
        super()
        this.state = {
            isLoaded: 0
        }
        this.id = null
        this.stationGeneral = []
        this.stationGeneralDetails = new Map()
        this.stationSignalBasic = []
        this.stationSignalBasicDetails = new Map()
        this.stationTrackCircuit = []
        this.stationDocumentsAvailable = []
        this.stationPoints = []
    }

    componentDidMount() {
        this.id = this.props.match.params.station
        var self = this
        this.getStationData(this.id, () => {
            console.log("Inside Callback")
            self.setState({
                isLoaded: 0
            })
        })
    }

    getStationData(id, callback) {
        this.getStationGeneralData(id, callback)
        this.getStationSignalBasicData(id, callback)
        this.getstationTrackCircuitData(id, callback)
        this.getStationDocumentsAvailableData(id, callback)
        this.getStationPoints(id, callback)
    }

    getStationGeneralData(id, callback) {
        // console.log("Inside getStationGeneralData")
        var url = serverURL+"/station/stations_general"
        Axios.get(url, {params: {id: id}})
        .then((response)=>{
            // console.log(response.data)
            if (response.data.length > 0) { 
                this.stationGeneral = response.data[0]
                // Object.entries(this.stationGeneral).map(([key,value], index) => {
                //     this.stationGeneralDetails.set(key, value)
                // })
                callback()
            }
        })
    }

    getStationSignalBasicData(id, callback) {
        // console.log("Inside getStationSignalBasicData")
        var url = serverURL+"/station/stations_signal_basic"
        Axios.get(url, {params: {id: id}})
        .then((response)=>{
            // console.log(response.data)
            if (response.data.length > 0) { 
                this.stationSignalBasic = response.data[0]
                console.log(response.data)
                // Object.entries(this.stationSignalBasic).map(([key,value], index) => {
                //     this.stationSignalBasicDetails.set(key, value)
                // })
                callback()
            }
        })
    }

    getstationTrackCircuitData(id, callback) {
        // console.log("Inside getstationTrackCircuitData")
        var url = serverURL+"/station/stations_track_circuit"
        Axios.get(url, {params: {id: id}})
        .then((response)=>{
            // console.log(response.data)
            if (response.data.length > 0) { 
                this.stationTrackCircuit = response.data[0]
                callback()
            }
        })
    }

    getStationDocumentsAvailableData(id, callback) {
        var url = serverURL+"/station/stations_documents_available"
        Axios.get(url, {params: {id: id}})
        .then((response)=>{
            // console.log(response.data)
            if (response.data.length > 0) { 
                this.stationDocumentsAvailable = response.data[0]
                // console.log(this.stationTrackCircuit)
                callback()
            }
        })
    }

    getStationPoints(id, callback) {
        var url = serverURL+"/station/stations_points"
        Axios.get(url, {params: {id: id}})
        .then((response)=>{
            // console.log(response.data)
            if (response.data.length > 0) { 
                this.stationPoints = response.data[0]
                callback()
            }
        })
    }

    render() {
        const { classes } = this.props;
        const station_id = this.props.match.params.station;
        console.log("Inside Points Render")
        console.log(station_id)
        return(
            <div>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <Grid container spacing={3} justify="center" className={classes.top}>
                    <Grid item xs={12}>
                        <Paper elevation={3} className={classes.paper}>
                            <h3>{this.stationGeneral['Station Name']} ({this.stationGeneral['Station Code']})</h3>
                        </Paper>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Grid container spacing={3} justify="center">
                            <Grid item xs={6} md={3}>
                                <Paper elevation={3} className={classes.paper}>
                                    <a href="#generalDetails"><h4>General Details</h4></a>
                                    <a href="#signalBasic"><h4>Signal Basic</h4></a>
                                    <a href="#points"><h4>Points</h4></a>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid> */}
                    
                    <StationTabularData id="generalDetails" heading="General Details" xs="12" md="4" data={this.stationGeneral}/>
                    
                    <StationTabularData id="documentsAvailable" heading="Documents available at Station" xs="12" md="4" data={this.stationDocumentsAvailable}/>
                    {console.log("ohohohoh")}
                    {console.log(this.id)}
                    {console.log("ohohohoh")}
                    <Grid item xs={12} md={4}>
                        <Grid container direction="column" spacing={3} justify="center">
                            <StationTabularData id="signalBasic" heading="Signal Basic" xs="12" md="" data={this.stationSignalBasic}/>
                            <StationTabularData id="trackCircuits" heading="Track Circuits" link={"../list/points/"+station_id} xs="12" md="" data={this.stationTrackCircuit}/>
                            <StationTabularData id="points" heading="Points" link={"../list/points/"+station_id} xs="12" md="" data={this.stationPoints}/>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(ViewStation)