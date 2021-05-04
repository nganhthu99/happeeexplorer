import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import useStyles from "../../Style/StyleSheet";
import {Typography} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { useParams } from 'react-router-dom';
import {getBalanceByAddress} from "../../Service/address-service";

const AddressDetail = (props) => {
    const classes = useStyles()
    const {address} = useParams()
    const [balance, setBalance] = useState('')

    useEffect(() => {
        getBalanceByAddress(address)
            .then((res) => {
                console.log(res.data)
                setBalance(res.data.balance)
            })
            .catch((error) => {

            })
    }, [address])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item container xs={12}>
                            <Grid item xs={2}>
                                <Typography >Address: </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Link>{address}</Link>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12}>
                            <Grid item xs={2}>
                                <Typography >Amount: </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography >{`${balance} Happee Coin`}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
};

export default AddressDetail;
