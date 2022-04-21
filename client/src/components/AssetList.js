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


var item = "";
var data = [];
var head = []
var list = new Map()

function print(data,flag=0) {
  if (flag === 1) {
    console.log(data)
  }
}

function getAssetsList(callbackFunction) {
  var url = serverURL + "/assets/list"
  Axios.get(url)
  .then((response) => {
    var listData = response.data
    listData.forEach((value) => {
      list.set(value['url_name'], value['display_name'])
    })
    print("Inside getAssetList", 0)
    callbackFunction()
  })
}

function getData(fun, item, id, callback) {
  var url = serverURL + "/assets/" + item
  print(url)
  Axios.get(url, {params: {id, id}})
  .then((response) => {
        if (response.data.length > 0) {
          var one = response.data[0]
          Object.entries(one).map(([key, values])=>{
              head.push(key)
          })
          print(head)
          data['head'] = head;
          data['data'] = response.data;
          
        }
        callback();
    });
}

class AssetList extends Component {
    constructor(){
        print("Inside AssetList constructor")
        super()
        this.id = null
        this.pointsData = [];
        this.appStateCallback = this.appStateCallback.bind(this);
    }
    

    componentDidMount() {
        print("Inside AssetList componentDidMount", 0)
        print(this.id, 0)
        item = String(this.props.match.url.split("/")[2])
        getAssetsList(() => newFunction(this.id, this.appStateCallback))

        function newFunction(id, callback) {
          print("Inside newFunction", 0)
          if(list.has(item)) {
            var fun = "get"
            fun = fun + list.get(item).replace(/\s/g,'') + "Data"
            getData(fun, item, id, callback)
          }
        }
    }

    appStateCallback() {
      this.setState({"isLoaded": true});
    }
    

    render() {
        print("Inside AssetList render")
        const {classes} = this.props
        print(this.props)
        this.id = this.props.match.params.station
        return(
            <div>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <Grid container spacing={3} justify="center" className={classes.top}>
                    <Grid item xs={12}>
                        <Paper elevation={3} className={classes.paper}>
                            <h3>List of {list.get(item)}</h3>
                        </Paper>
                    </Grid>
                    <AssetTabularData id="generalDetails" heading="General Details" xs="12" md="4" data={data}/>
                </Grid>
            </div>
        )
    }

}

export default withStyles(styles)(AssetList)