import React, {Component} from 'react'
import Helmet from 'react-helmet'
import { Grid, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import Axios from 'axios'

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

var  host = window.location.hostname
host = "http://" + host
const serverPort = 4001
const serverURL = host + ":" + serverPort

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

class Asset extends Component{

    constructor() {
        super()
        this.state = {
            isLoaded: 0
        }
        this.id = null
        this.station = null
    }

    componentDidMount() {
        getAssetsList(() => {
            this.setState({
                isLoaded: 1
            })
        })
    }

    render(){
        const { classes } = this.props;
        this.id = this.props.match.params.id
        this.station = this.props.match.params.station
        this.asset = this.props.match.params.asset
        return(
            <div>
                <Helmet>
                    <title>{this.props.match.params.asset}</title>
                </Helmet>
                <Grid container spacing={3} className={classes.top}>
                    <Grid item xs={12}>
                        <Paper elevation={3} className={classes.paper}>
                            <h3>{list.get(this.asset)}</h3>
                        </Paper>
                    </Grid>
                </Grid>
                <h1>
                    asset
                </h1>
                {this.props.match.params.asset} <br/> 
                {this.props.match.params.station} <br/>
                {this.props.match.params.id}
                <h1>
                    asset
                </h1>
                <Grid container spacing={3}>

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Asset)