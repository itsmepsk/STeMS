import React, {Component} from 'react'
import Helmet from 'react-helmet'
import AssetTabularData from './AssetTabularData'
import { Grid, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import Axios from 'axios'
import { Select } from '@material-ui/core'
import { Link } from 'react-router-dom'

const title = "Points List"

var  host = window.location.hostname
host = "http://" + host
const serverPort = 4001
const serverURL = host + ":" + serverPort

function AppState(appStateCallback) {
  
};

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

class Points extends Component {
    constructor(){
        console.log("Inside Points constructor")
        super()
        this.id = null
        this.pointsData = []
    }
    

    componentDidMount() {
        console.log("Inside Points componentDidMount")
        var self = this
        this.getPointsData(this.id, ()=>{
            console.log("Inside Callback function.")
            console.log(this.pointsData)
            self.setState({
                isLoaded: 1
            })
        })
    }

    getPointsData(id, callback) {
        console.log("Inside Points getPointsData")
        var url = serverURL + "/assets/points"
        console.log(url)
        Axios.get(url, {params: {id, id}})
        .then((response) => {
            // console.log(response.data)
            if (response.data.length > 0) {
                this.pointsData = response.data;
                callback()
            }
        })
    }

    render() {
        console.log("Inside Points render")
        const {classes} = this.props
        this.id = this.props.match.params.station
        // console.log("Inside render")
        const data = {
            'a' : 'b',
            'c' : 'd'
        }
        console.log(this.pointsData)
        return(
          
            <div>
              
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <Grid container spacing={3} justify="center" className={classes.top}>
                    <Grid item xs={12}>
                        <Paper elevation={3} className={classes.paper}>
                            <h3>List of Points</h3>
                        </Paper>
                    </Grid>
                    <AssetTabularData id="generalDetails" heading="General Details" xs="12" md="4" data={this.pointsData}/>
                </Grid>
            </div>
        )
    }

}

export default withStyles(styles)(Points)