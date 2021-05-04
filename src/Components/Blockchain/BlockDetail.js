import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import useStyles from "../../Style/StyleSheet";
import {Divider, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import {useHistory, useLocation} from "react-router-dom";
import {getBlockByHashService, getBlockByIndexService} from "../../Service/block-service";

const BlockDetail = (props) => {
    const classes = useStyles()
    const [detail, setDetail] = useState({data: []})
    const history = useHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const location = useLocation()

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        if (query.get("hash")) {
            const hash = query.get("hash")
            getBlockByHashService(hash)
                .then((res) => {
                    console.log(res.data.index)
                    setDetail(res.data)
                })
                .catch((error) => {

                })
        } else if (query.get("index")) {
            const index = query.get("index")
            getBlockByIndexService(index)
                .then((res) => {
                    console.log(res.data.index)
                    setDetail(res.data)
                })
                .catch((error) => {

                })
        }
    }, [location])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item container xs={12}>
                            <Grid item xs={4}>
                                <Typography>Block Index: </Typography>
                            </Grid>
                            <Grid item container xs={8}>
                                <Grid item>
                                    <Tooltip title="Previous block" placement="top">
                                        <IconButton size="small"
                                                    color="primary"
                                                    onClick={() => {
                                                        history.push('/block?index=' + (detail.index - 1))}
                                                    }>
                                            <SkipPreviousRoundedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Chip variant="outlined" label={detail.index} color="primary"/>
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Next block" placement="top">
                                        <IconButton size="small"
                                                    color="primary"
                                                    onClick={() => {
                                                        history.push('/block?index=' + (detail.index + 1))}
                                                    }>
                                            <SkipNextRoundedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}><Divider/></Grid>
                        <Grid item container xs={12}>
                            <Grid item xs={4}>
                                <Typography>Timestamp: </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>{new Date(detail.timestamp).toUTCString()}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}><Divider/></Grid>
                        <Grid item container xs={12}>
                            <Grid item xs={4}>
                                <Typography>Transactions: </Typography>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Click to view transactions" placement="top">
                                    <Chip
                                        label={`${detail.data.length} transactions`}
                                        onClick={() => {history.push('/transactions?block=' + detail.hash)}}
                                        color="primary"
                                    />
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}><Divider/></Grid>
                        <Grid item container xs={12}>
                            <Grid item xs={4}>
                                <Typography>Difficulty: </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>{detail.difficulty}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}><Divider/></Grid>
                        <Grid item container xs={12}>
                            <Grid item xs={4}>
                                <Typography>Nonce: </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>{detail.nonce}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}><Divider/></Grid>
                        <Grid item container xs={12}>
                            <Grid item xs={4}>
                                <Typography>Previous Block Hash: </Typography>
                            </Grid>
                            <Grid item>
                                <Link component="button"
                                      onClick={() => {
                                          history.push('/block?hash='+detail.previousHash)}
                                      }>
                                    {detail.previousHash}
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}><Divider/></Grid>
                        <Grid item container xs={12}>
                            <Grid item xs={4}>
                                <Typography>Block Hash: </Typography>
                            </Grid>
                            <Grid item>
                                <Link onClick={() => {}}>
                                    {detail.hash}
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}><Divider/></Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default BlockDetail;
