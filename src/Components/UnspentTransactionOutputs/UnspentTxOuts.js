import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import useStyles from "../../Style/StyleSheet";
import Title from "../../Title";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Link from "@material-ui/core/Link";
import {getUnspentTxOutsService} from "../../Service/unspentTxOuts-service";
import {useHistory} from "react-router-dom";

const UnspentTxOuts = (props) => {
    const classes = useStyles()
    const [unspentTxOuts, setUnspentTxOuts] = useState([])
    const history = useHistory()

    useEffect(() => {
        getUnspentTxOutsService()
            .then((res) => {
                setUnspentTxOuts(res.data)
            })
            .catch((error) => {

            })
    }, [])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <React.Fragment>
                        <Title>Unspent Transaction Outputs</Title>
                        <Table size="big">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCell2}>Transaction Id</TableCell>
                                    <TableCell>Output Index</TableCell>
                                    <TableCell className={classes.tableCell2}>Owner Address</TableCell>
                                    <TableCell align='right'>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {unspentTxOuts.map((row, index) => (
                                    <TableRow key={index} hover onClick={() => {}}>
                                        <TableCell className={classes.tableCell2}><Link component="button" onClick={() => {history.push('/transaction/' + row.txOutTransactionId)}}>{row.txOutTransactionId}</Link></TableCell>
                                        <TableCell>{row.txOutIndex}</TableCell>
                                        <TableCell className={classes.tableCell2}><Link component="button" onClick={() => {history.push('/address/'+row.address)}}>{row.address}</Link></TableCell>
                                        <TableCell align='right'>{row.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </React.Fragment>
                </Paper>
            </Grid>
        </Grid>
    )
};

function createData2(transactionId, outputIndex, ownerAddress, amount) {
    return { transactionId, outputIndex, ownerAddress, amount };
}

const rows = [
    createData2('3uy21idwue7y2u1xsadsadi2', 23, '321412321312jbdskjhdaw',25),
    createData2('3uy21idwue7y2u1xsadsadi2', 23, '321412321312jbdskjhdaw',25),
    createData2('3uy21idwue7y2u1xsadsadi2', 23, '321412321312jbdskjhdaw',25),
    createData2('3uy21idwue7y2u1xsadsadi2', 23, '321412321312jbdskjhdaw',25),
    createData2('3uy21idwue7y2u1xsadsadi2', 23, '321412321312jbdskjhdaw',25),
];

export default UnspentTxOuts;
