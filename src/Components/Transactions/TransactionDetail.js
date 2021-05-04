import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import useStyles from "../../Style/StyleSheet";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {useHistory, useParams} from 'react-router-dom';
import {getTransactionByIdService} from "../../Service/transaction-service";
import Chip from "@material-ui/core/Chip";
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
const TransactionDetail = (props) => {
    const classes = useStyles()
    const [openTxIns, setOpenTxIns] = React.useState(true);
    const [openTxOuts, setOpenTxOuts] = React.useState(true);
    const {id} = useParams()
    const [detail, setDetail] = useState({txIns: [], txOuts: []})
    const history = useHistory()

    useEffect(() => {
       getTransactionByIdService(id)
           .then((res) => {
               setDetail(res.data)
           })
           .catch((error) => {

           })
    }, [id])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    {
                                        detail.confirmed &&
                                        <Chip
                                            icon={<CheckRoundedIcon />}
                                            label="Confirmed Transaction"
                                            color="primary"
                                            variant="outlined"
                                        />
                                    }
                                    {
                                        !detail.confirmed &&
                                        <Chip
                                            icon={<CloseRoundedIcon />}
                                            label="Unconfirmed Transaction"
                                            color="secondary"
                                            variant="outlined"
                                        />
                                    }
                                </Grid>
                                <Grid item container xs={12}>
                                    <Grid item xs={3}>
                                        <Typography style={{ fontWeight: 600 }}>Transaction Id: </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Link>{detail.id}</Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                        }
                        className={classes.list}>

                        {/*Transaction Inputs*/}
                        <ListItem button onClick={() => {setOpenTxIns(!openTxIns)}} aria-expanded>
                            <ListItemIcon>
                                <SubdirectoryArrowRightIcon />
                            </ListItemIcon>
                            <ListItemText primary="Transaction Inputs" />
                            {openTxIns ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openTxIns} timeout="auto" unmountOnExit>
                            <TableContainer>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableCell2}>Transaction Output Id</TableCell>
                                            <TableCell align="right">Transaction Output Index</TableCell>
                                            <TableCell className={classes.tableCell2} align="right">Signature</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {detail.txIns.map((row) => (
                                            <TableRow key={row.signature}>
                                                <TableCell component="th" scope="row" className={classes.tableCell2}>
                                                    <Link component="button">{row.txOutTransactionId}</Link>
                                                </TableCell>
                                                <TableCell align="right">{row.txOutIndex}</TableCell>
                                                <TableCell className={classes.tableCell2} align="right">{row.signature}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Collapse>

                        {/*Transaction outputs*/}
                        <ListItem button onClick={() => {setOpenTxOuts(!openTxOuts)}}>
                            <ListItemIcon>
                                <SubdirectoryArrowLeftIcon />
                            </ListItemIcon>
                            <ListItemText primary="Transaction Outputs" />
                            {openTxOuts ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openTxOuts} timeout="auto" unmountOnExit>
                            <TableContainer>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableCell2}>Receiver Address</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {detail.txOuts.map((row) => (
                                            <TableRow key={row.address}>
                                                <TableCell component="th" scope="row" className={classes.tableCell2}>
                                                    <Link component="button" onClick={() => {history.push('/address/' + row.address)}}>{row.address}</Link>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.amount} Happee Coin
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Collapse>
                    </List>
                </Paper>
            </Grid>
        </Grid>
    )
};

export default TransactionDetail;
