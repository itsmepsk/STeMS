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


var pointsData = [];
var head = []

function AppState(id1, appStateCallback) {
  function getPointsData(id, callback) {
    console.log("Inside Points getPointsData")
    var url = serverURL + "/assets/points"
    console.log(url)
    Axios.get(url, {params: {id, id}})
    .then((response) => {
          // console.log(response.data)
          if (response.data.length > 0) {
            var one = response.data[0]
            
            Object.entries(one).map(([key, values])=>{
                head.push(key)
            })
            console.log(head)
            pointsData['head'] = head;
            pointsData['data'] = response.data;
            
          }
          appStateCallback();
      });
  }
  getPointsData(id1);
};

class Points extends Component {
    constructor(){
        console.log("Inside Points constructor")
        super()
        this.id = null
        this.pointsData = [];
        this.appStateCallback = this.appStateCallback.bind(this);
    }
    

    componentDidMount() {
        console.log("Inside Points componentDidMount")
        AppState(this.id, this.appStateCallback);
    }
    appStateCallback() {
      this.setState({"isLoaded": true});
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
        console.log(pointsData)
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
                    <AssetTabularData id="generalDetails" heading="General Details" xs="12" md="4" data={pointsData}/>
                </Grid>
            </div>
        )
    }

}

export default withStyles(styles)(Points)