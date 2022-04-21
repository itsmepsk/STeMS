import React, {Component} from 'react'
import { Grid, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import CellInRow from './CellInRow'

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

class RowInTable extends Component {

    constructor(props) {

        super(props)
        this.state = {
            isLoaded: 0
        }
        this.pointsLength = 0;
        this.data = null
        this.one  = null
        this.head = []
        print("Inside RowInTable Constructor")

    }

    componentDidMount() {
        print("Inside RowInTable componentDidMount")
    }

    componentDidUpdate() {
        print("Inside RowInTable componentDidUpdate")
    }

   render() {
       var index = this.props.index
       var row = this.props.row
       print("Inside RowInTable Render")
       return(
            <StyledTableRow>
                <StyledTableCell>
                    {index}
                </StyledTableCell>
                {
                  Object.values(row).map(value => {
                    return <CellInRow data={value}/>
                  })
                }
            </StyledTableRow>
       )
   }


}

export default withStyles(styles)(RowInTable)