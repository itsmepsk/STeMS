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

class TabularData extends Component {

    render() {
        const {classes} = this.props
        // console.log(this.props)
        return(
            <Grid id={this.props.id} item xs={this.props.xs} md={this.props.md}>
                <Paper elevation={3} className={classes.paper}>
                    <h4><b><a href={this.props.link}>{this.props.heading}</a></b></h4>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>
                                        S No.
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Item
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        Value
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(this.props.data).map(([key, value], index) => {
                                    if (key !== "Station ID") {
                                        return (
                                            <StyledTableRow key = {key}>
                                                <StyledTableCell>
                                                    {index = index + 1}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {key}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {value}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    }
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        )
    }

}

export default withStyles(styles)(TabularData)