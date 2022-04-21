import React, {Component} from 'react'
import { Grid, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { Paper } from '@material-ui/core'

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

function print(data,flag=0) {
  if (flag === 1) {
    console.log(data)
  }
}

class CellInRow extends Component {

    constructor(props) {

        super(props)
        this.state = {
            isLoaded: 0
        }
        print("Inside CellInRow Constructor")

    }

    componentDidMount() {
        print("Inside CellInRow componentDidMount")
    }

    componentDidUpdate() {
        print("Inside CellInRow componentDidUpdate")
    }

   render() {
       var data = this.props.data
       print("Inside CellInRow Render")
       return(
            <StyledTableCell>
                {data}
            </StyledTableCell>
       )
   }


}

export default withStyles(styles)(CellInRow)