import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../Title';
import { useHistory } from 'react-router-dom';
import Link from "@material-ui/core/Link";
import useStyles from "../../Style/StyleSheet";

const TransactionsTable = (props) => {
    const rows = props.data
    const history = useHistory()
    const classes = useStyles()

    const handleClick = (id) => {
        history.push('/transaction/' + id)
    }

    return (
        <React.Fragment>
            <Title>Transactions List</Title>
            <Table size="big">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableCell}>Transaction Id</TableCell>
                        <TableCell align='right'>Transaction Inputs</TableCell>
                        <TableCell align='right'>Transaction Outputs</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id} hover onClick={() => {handleClick(row.id)}}>
                            <TableCell className={classes.tableCell}><Link>{row.id}</Link></TableCell>
                            <TableCell align='right'>{row.txIns.length}</TableCell>
                            <TableCell align='right'>{row.txOuts.length}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export default TransactionsTable
