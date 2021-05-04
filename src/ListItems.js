import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import ViewWeekRoundedIcon from '@material-ui/icons/ViewWeekRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
import { useHistory } from 'react-router-dom';

const ListItems = () => {
    const history = useHistory()

    return (
        <div>
            <ListItem button onClick={() => {history.push('/explorer')}}>
                <ListItemIcon>
                    <ExploreRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary="Explorer"/>
            </ListItem>
            <ListItem button onClick={() => {history.push('/blockchain')}}>
                <ListItemIcon>
                    <ViewWeekRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary="Blockchain"/>
            </ListItem>
            <ListItem button onClick={() => {history.push('/transactions-pool')}}>
                <ListItemIcon>
                    <AccountBalanceRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary="Transactions Pool"/>
            </ListItem>
            <ListItem button onClick={() => {history.push('/unspent-transaction-outputs')}}>
                <ListItemIcon>
                    <MonetizationOnRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary="Unspent Transaction Outputs"/>
            </ListItem>
        </div>
    )
}

export default ListItems
