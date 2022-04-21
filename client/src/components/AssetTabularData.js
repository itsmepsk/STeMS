import React, {Component} from 'react'
import { Grid, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import RowInTable from './RowInTable'

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

var dataLength = 0

function print(data,flag=0) {
    if (flag === 1) {
      console.log(data)
    }
  }

class AssetTabularData extends Component {

    constructor(props) {

        super(props)
        this.state = {
            isLoaded: 0
        }
        this.pointsLength = 0;
        this.data = null
        this.one  = null
        this.head = []
        print("Inside AssetTabularData Constructor")

    }

    componentDidMount() {
        print("Inside AssetTabularData componentDidMount")
    }

    // static getDerivedStateFromProps(props, state) {
    //     this.data = this.props.data
    //     print("Inside AssetTabularData getDerivedStateFromProps")
    //     this.getTableHead(()=>{
    //         print("Inside AssetTabularData Callback")
    //         return null
    //     })
    // }

    // shouldComponentUpdate() {
        // this.data = this.props.data
        // print("Inside AssetTabularData shouldComponentUpdate")
        // print(this.props.data)
        // print(this.props)
        // if (this.pointsLength != this.props.data.length) {
        //     this.pointsLength = this.props.data.length;
        //     this.setState({"isLoaded": true});
        // }
        // this.getTableHead(()=>{
        //     print("Inside AssetTabularData Callback")
        // })
    // }

    componentDidUpdate() {
        print("Inside AssetTabularData componentDidUpdate")
    }

    getTableHead(callback) {
        print("Inside AssetTabularData getTableHead")
        // print(this.data)
        if(this.data.length > 0) {
            this.one = this.data[0]
            // print(this.one)
            Object.entries(this.one).map(([key, values])=>{
                this.head.push(key)
            })
            print(this.head)
            print(Object.prototype.toString.call(this.head))
            this.head.forEach(entry=>{
                print("*****"+entry+"*****")
            })
            // print(Object.prototype.toString.call(this.head))
            callback()
        }
        else {
            print("Naa")
            callback()
        }
        
    }

    render() {
        print("Inside AssetTabularData render")
        print(this.props)
        const {classes} = this.props
        this.data = this.props.data
        print(this.props.data.data)
        if(this.props.data.head) {
            return(
                <Grid id={this.props.id} item xs={this.props.xs} md={this.props.md}>
                    <Paper elevation={3} className={classes.paper}>
                        <h4><b><a href={this.props.link}>{this.props.heading}</a></b></h4>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell>S No.</StyledTableCell>
                                        {
                                            this.props.data.head.map(function(obj, i){
                                                // print(obj)
                                                return (<StyledTableCell>{obj}</StyledTableCell>) 
                                            })
                                        }
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {/* <RowInTable/> */}
                                    {
                                       this.props.data.data.map((value2, temp) => {
                                        print(temp);
                                        return (<RowInTable index = {temp+1} row = {value2}/>)
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            )
        } else {
            return null;
        }
    }

}

export default withStyles(styles)(AssetTabularData)