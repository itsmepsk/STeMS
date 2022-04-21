import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { Button, Link } from '@material-ui/core'
import ViewStation from './ViewStation'

var  host = window.location.hostname
host = "http://" + host
const serverPort = 4001
const serverURL = host + ":" + serverPort

var Queue = require("../libraries/Queue")
var Stack = require("../libraries/Stack")

const title = "Stations List"

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
    //   width: "24px",
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

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
    },
    formControl: {
        margin: theme.spacing(1),
        // minWidth: 120,
        width: "250px"
    },
    inputLabel: {
        fontSize: "20px",
        fontWeight: "bold"
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

class Signal extends Component {

    constructor() {
        super()
        this.state = {
            isLoaded: 0,
            currentZone : "Select",
            currentDivision : "Select",
            divisionDisabled: true,
            sectionDisabled: true,
            stations: []
        }
        this.zones = []
        this.divisions = []
        this.sec = new Map()
        this.rootSection = null
        this.leafSections = []
        this.sections = []
        this.stations = []

    }

    createLoopableSectionArray() {
        var S = new Stack()
        if (this.rootSection != null) {
            S.push(this.rootSection)
        }
        this.sections = []
        while(!S.isEmpty()) {
            var node = S.pop()
            this.sections.push(node)
            node.children.map((value, index) => {
                S.push(this.sec.get(value.id))
                return true
            })
        }
    }

    createSectionsMap() {

        this.sections.map((value, index) => {
            if (value.parent_section == null) {
                var children = []
                if (this.sec.has(value.id)) {
                    children = this.sec.get(value.id).children
                }
                this.sec.set(value.id, {data: value, children: children, height: 0})
            }
            else if (this.sec.has(value.id)) {
                var children2 = this.sec.get(value.id).children
                this.sec.set(value.id, {data: value, children: children2})
                var parent_children = this.sec.get(value.parent_section).children
                var parent_data = this.sec.get(value.parent_section).data
                parent_children.push(value)
                this.sec.set(value.parent_section, {data: parent_data, children: parent_children, height: 0})
            }
            else if(this.sec.has(value.parent_section)) {
                var arr = this.sec.get(value.parent_section).children
                arr.push(value)
                var obj = {
                    data: this.sec.get(value.parent_section).data,
                    children: arr,
                    height: 0
                }
                this.sec.set(value.parent_section, obj)
                this.sec.set(value.id, {data: value, children: [], height: 0})
            }
            else {
                var children3 = []
                children3.push(value)
                this.sec.set(value.parent_section, {data: "", children: children3})
                this.sec.set(value.id, {data: value, children: [], height: 0})
            }
            return true
        })

        var counter = 0
        this.sec.forEach((value, key) => {
            counter = counter + 1  //  This is not O(n^2). It is O(2n).
            if (value.data.parent_section == null) {
                this.sec.set(key, {
                    data: value.data,
                    children: value.children,
                    height: 0,
                    parent: [null]
                })
            }
            value.children.map((value2, index) => {
                counter = counter + 1
                var obj = {
                    data: this.sec.get(value2.id).data,
                    children: this.sec.get(value2.id).children,
                    height: 0,
                    parent: [value]
                }
                this.sec.set(value2.id, obj)
                return true
            })
            
        })
        this.sec.forEach((value, key) => {
            if (value.parent[0] == null) {
                this.rootSection = value
                var Q = new Queue()
                Q.push(value)
                while (!Q.isEmpty()) {
                    Q.getFront().children.map((item, index) => {
                        var obj = this.sec.get(item.id)
                        obj['height'] = Q.getFront().height + 1
                        Q.push(this.sec.get(item.id))
                        return true
                    })
                    Q.pop()
                }
                return
            }
        })
    }

    componentDidMount() {
        console.log("Inside cDM")
        var self = this
        this.getZones(() => {
            self.setState({
                isLoaded: 1
            })
        })
    }

    getZones(callback) {
        var url = serverURL+"/station_list/zones"
        Axios.get(url)
        .then((response) => {
            this.zones = response.data
            callback()
        })
    }

    getDivisions(zone, callback) {
        var xy = this
        var url = serverURL+"/station_list/divisions"
        xy.divisions = []
        Axios.get(url, {params: {zone: zone}})
        .then((response) => {
            xy.divisions = response.data
            callback()
        })
    }


    getSections(division, callback) {
        var url = serverURL+"/station_list/signal_sections"
        Axios.get(url, {params: {zone: this.state.currentZone, division: this.state.currentDivision}})
        .then((response) => {
            var sectionsData = response.data
            this.sections = sectionsData
            sectionsData.map((i) => {
                this.sec.set(i[0], i[1])
                return true
            })
            // console.log(this.sections)
            
            callback()
        })
    }

    getStationList(id, callback) {
        var url = serverURL+"/station_list/signal_stations"
        var sectionList = this.getLeafSections(this.sec.get(parseInt(id)))
        Axios.get(url, {params: {sections: JSON.stringify(sectionList)}})
        .then((response) => {
            this.stations = response.data
            callback()
        })
    }

    getLeafSections(midNode) {
        var sectionsList = []
        if (midNode.children.length === 0) {
            sectionsList.push(midNode.data.id)
            return sectionsList
        }
        var Q = new Queue()
        Q.push(midNode)
        while(! Q.isEmpty()) {
            var node = Q.pop()
            sectionsList.push(node.data.id)
            if (node.children.length > 0) {
                node.children.map((value, index) => {
                    Q.push(this.sec.get(value.id))
                    return true
                }) 
            }
            else {
                sectionsList.push(node.data.id)
            }
        }
        return sectionsList
    }

    zoneChangeHandler = (event) => {
        this.stations = []
        this.setState({
            sectionDisabled: true,
            currentZone: event.target.value,
            currentDivision: "Select"
        }, () => {
            var dis = (event.target.value === "Select")? true:false
            this.getDivisions(event.target.value, () => {
                this.setState({
                    isLoaded: 1,
                    divisionDisabled: dis
                })
            })
        })
    }

    divisionChangeHandler = (event) => {
        this.setState({
            currentDivision : event.target.value
        }, () => {
            this.stations = []
            var dis = (event.target.value === "Select")? true:false
            this.getSections(event.target.value, () => {
                this.sec = new Map()
                this.rootSection = null
                this.createSectionsMap()
                this.createLoopableSectionArray()
                this.setState({
                    isLoaded: 1,
                    sectionDisabled: dis
                })
            })
        })
        

    }

    sectionChangeHandler = (event) => {
        this.getStationList(event.target.value, () => {
            this.setState({
                isLoaded: 1
            })
        })
    }

    something = () => {
        // alert("Hello")
        return <ViewStation/>
    }

    render() {
        console.log("Inside render")
        const { classes } = this.props;
        var Q = new Queue()
        Q.push(this.rootSection)
        return(
            <div>
                <Helmet>
                    <title>{title}</title>
                </Helmet>

                <Grid container spacing={3} justify="center" className={classes.top}>
                    <Grid item xs={12}>
                        <Paper elevation={3} className={classes.paper}>
                            <h3>Stations</h3>
                        </Paper>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Paper elevation={3} className={classes.paper}>
                        <Grid container spacing={3} justify="center">
                            <Grid item md={12} lg={6}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel className={classes.inputLabel}>Select Zone</InputLabel>
                                        <Select native defaultValue={this.state.currentZone} onChange={this.zoneChangeHandler} input={<BootstrapInput />}>
                                            <option value="Select">Select</option>
                                            {this.zones.map((value, index) => {
                                                return <option key={index} value={value.id}>{value.zone_name}</option>
                                            })}
                                        </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md = {12} lg={6}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    {/* <Form.Group> */}
                                        <InputLabel className={classes.inputLabel}>Select Division</InputLabel>
                                        <Select disabled={this.state.divisionDisabled} native defaultValue={this.state.currentDivision} onChange={this.divisionChangeHandler} input={<BootstrapInput />}>
                                            <option value = "Select">Select</option> 
                                            {this.divisions.map((m) => {
                                                return <option key={m.id} value={m.id}>{m.division_name} - {m.division_code}</option>
                                            })}
                                        </Select>
                                    {/* </Form.Group> */}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={3}>
                            <Grid item md = {12} lg={6}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    {/* <Form.Group> */}
                                        <InputLabel className={classes.inputLabel}>Select Section</InputLabel>
                                        <Select native disabled={this.state.sectionDisabled} defaultValue="Select" onChange={this.sectionChangeHandler} input={<BootstrapInput />}>
                                            <option>Select</option> 
                                            {this.sections.map((m) => {
                                                try {
                                                return <option key={m.data.id} value={m.data.id}>{'\u00A0'.repeat(3*m.height) + m.data.section_name}</option>
                                                }
                                                catch(e) {

                                                }
                                                return true
                                            })}
                                        </Select>
                                    {/* </Form.Group> */}
                                </FormControl>
                            </Grid>
                        </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} className={classes.paper}>
                            <TableContainer component ={Paper}>
                                <Table>
                                    <TableHead>
                                        <StyledTableRow>
                                            <StyledTableCell>
                                                S No.
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                Station Code
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                Station Name
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                Section
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.stations.map((station, index=1) => {
                                            return(
                                                
                                                <StyledTableRow component={Link} target="blank" href={"/viewstation/"+station.id} key={station.id}>
                                                    <StyledTableCell>
                                                        {/* <a href="/viewstation/{index}"> */}
                                                        {index = index + 1}
                                                        {/* </a> */}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {station.station_code}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {station.station_name}
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        {station.section_name}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                                
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>

                {/* <Container> */}
                {/* <Row>
                    <Col lg={{span: 3, offset: 3}}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Select Department</Form.Label>
                                <Form.Control as="select" defaultValue="Select">
                                    <option>
                                        Select
                                    </option>
                                    <option>
                                        Signal
                                    </option>
                                    <option>
                                        Telecom
                                    </option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col lg={{span:3, offset:0}} className="mb-3">
                        <Form>
                            <Form.Group>
                                <Form.Label>Select Section</Form.Label>
                                <Form.Control as="select" defaultValue="Select" onChange={this.changeHandler}>
                                    <option>All</option> 
                                    {this.sections.map((m) => {
                                        return <option value={m.section}>{m.section_name}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row> */}
                {/* <Container> */}
                    {/* <Row>
                        <Col lg={{span: 6, offset:3}}>
                            <Table striped bordered hover variant="light" >
                                <thead>
                                    <tr>
                                        <th>
                                            S No.
                                        </th>
                                        <th>
                                            Station Code
                                        </th>
                                        <th>
                                            Station Name
                                        </th>
                                        <th>
                                            Section
                                        </th>
                                    </tr>
                                </thead>
                                <tbody> 
                                    {this.state.stations.map((m, x=1) => {
                                        return(
                                            <tr>
                                                <td>{x+=1}</td>
                                                <td>{m.station_code}</td>
                                                <td>{m.station_name}</td>
                                                <td>{m.section_name}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row> */}
                {/* </Container> */}
                {/* </Container> */}
            </div>
        )

    }

}

export default withStyles(styles)(Signal)