import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import BlockchainTable from "./BlockchainTable";
import useStyles from "../../Style/StyleSheet";
import {getBlockchainService} from "../../Service/block-service";

const Blockchain = (props) => {
    const classes = useStyles()
    const [blockchain, setBlockchain] = useState([])

    useEffect(() => {
        getBlockchainService()
            .then((res) => {
                setBlockchain(res.data.reverse())
            })
            .catch((error) => {

            })
    }, [])

    return (
        <Grid container spacing={3}>
            {/* Recent BlockchainTable */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <BlockchainTable data={blockchain}/>
                </Paper>
            </Grid>
        </Grid>
    )
};

export default Blockchain;
