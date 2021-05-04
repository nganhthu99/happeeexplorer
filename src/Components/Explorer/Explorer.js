import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";
import Info from "./Info";
import BlockchainTable from "../Blockchain/BlockchainTable";
import useStyles from "../../Style/StyleSheet";
import clsx from "clsx";
import Link from "@material-ui/core/Link";
import TransactionsTable from "../Transactions/TransactionsTable";
import {getBlockchainService, getChainLengthService, getDifficultyService} from "../../Service/block-service";
import {getPoolSizeService, getTransactionsPoolService} from "../../Service/transaction-service";
import {useHistory} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';

const criteria = [
    {
        value: 0,
        label: 'Block index',
    },
    {
        value: 1,
        label: 'Block hash',
    },
    {
        value: 2,
        label: 'Transaction id',
    },
    {
        value: 3,
        label: 'Address',
    },
];


const Explorer = (props) => {
    const history = useHistory()
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [blockchain, setBlockchain] = useState([])
    const [transactionsPool, setTransactionsPool] = useState([])
    const [difficulty, setDifficulty] = useState()
    const [chainLength, setChainLength] = useState()
    const [poolSize, setPoolSize] = useState()

    useEffect(() => {
        const blockchainPromise = getBlockchainService()
        const poolPromise = getTransactionsPoolService()
        const difficultyPromise = getDifficultyService()
        const chainLengthPromise = getChainLengthService()
        const poolSizePromise = getPoolSizeService()
        Promise.all([blockchainPromise, poolPromise, difficultyPromise, chainLengthPromise, poolSizePromise])
            .then((res) => {
                setBlockchain(res[0].data.reverse())
                setTransactionsPool(res[1].data)
                setDifficulty(res[2].data.difficulty)
                setChainLength(res[3].data.length)
                setPoolSize(res[4].data.size)
            })
            .catch((error) => {

            })
    }, [])

    const [searchBy, setSearchBy] = useState(0)
    const [searchContent, setSearchContent] = useState("")

    const handleSearchEvent = () => {
        console.log(searchBy)
        if (searchBy == 0) {
            history.push('/block?index=' + searchContent)
        } else if (searchBy == 1) {
            history.push('/block?hash=' + searchContent)
        } else if (searchBy == 2) {
            history.push('/transaction/' + searchContent)
        } else {
            history.push('/address/' + searchContent)
        }
    }

    return (
        <Grid container spacing={3}>
            {/* Search Bar */}
            <Grid item xs={12}>
                <Paper className={classes.searchBar}>
                    <TextField
                        variant="outlined"
                        select
                        value={searchBy}
                        onChange={(event) => {setSearchBy(event.target.value)}}
                        SelectProps={{native: true}}>
                        {criteria.map((option, index) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <InputBase
                        // onKeyPress={handleSearchEvent}
                        value={searchContent}
                        onChange={(event) => {setSearchContent(event.target.value)}}
                        className={classes.input}
                        placeholder={`Search ${criteria[searchBy].label}`}
                    />
                    <IconButton color="primary" onClick={handleSearchEvent} className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                    <Chart />
                </Paper>
            </Grid>
            {/* Recent Info */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                    <Info difficulty={difficulty}
                          chainLength={chainLength}
                          poolSize={poolSize}/>
                </Paper>
            </Grid>
            {/* Recent Blockchain */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <BlockchainTable data={blockchain}/>
                    <div className={classes.seeMore}>
                        <Link component='button' color="primary" onClick={() => {history.push('/blockchain')}}>
                            See more
                        </Link>
                    </div>
                </Paper>
            </Grid>
            {/* Recent Transactions In Pool */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <TransactionsTable data={transactionsPool}/>
                    <div className={classes.seeMore}>
                        <Link component='button' color="primary" onClick={() => {history.push('/transactions-pool')}}>
                            See more
                        </Link>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )
};

export default Explorer;
