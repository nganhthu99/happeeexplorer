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

const BlockchainTable = (props) => {
    const rows = props.data
    const history = useHistory()
    const classes = useStyles()

    const handleClick = (hash) => {
        history.push('/block?hash=' + hash)
    }

    return (
        <React.Fragment>
            <Title>Blockchain</Title>
            <Table size="big">
                <TableHead>
                    <TableRow>
                        <TableCell>Block Index</TableCell>
                        <TableCell className={classes.tableCell}>Block Hash</TableCell>
                        <TableCell align='right'>Timestamp</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.hash} hover onClick={() => {handleClick(row.hash)}}>
                            <TableCell>{row.index}</TableCell>
                            <TableCell className={classes.tableCell}><Link>{row.hash}</Link></TableCell>
                            <TableCell align='right'>{new Date(row.timestamp).toUTCString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export default BlockchainTable
