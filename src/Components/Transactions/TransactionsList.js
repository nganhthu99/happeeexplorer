import React, {useEffect, useState} from 'react';
import useStyles from "../../Style/StyleSheet";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TransactionsTable from "./TransactionsTable";
import {getTransactionsPoolService} from "../../Service/transaction-service";
import {useLocation} from "react-router-dom";
import {getBlockByHashService} from "../../Service/block-service";

const TransactionsList = (props) => {
    const classes = useStyles()
    const [transactionsList, setTransactionsList] = useState([])
    const location = useLocation()

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        if (query.get('block')) {
            const hash = query.get('block')
            getBlockByHashService(hash)
                .then((res) => {
                    setTransactionsList(res.data.data)
                })
                .catch((error) => {

                })
        } else {
            getTransactionsPoolService()
                .then((res) => {
                    setTransactionsList(res.data)
                })
                .catch((error) => {

                })
        }
    }, [location])

    return (
        <Grid container spacing={3}>
            {/* Recent BlockchainTable */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <TransactionsTable data={transactionsList}/>
                </Paper>
            </Grid>
        </Grid>
    )
};

export default TransactionsList;
