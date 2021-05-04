import React from 'react';
import {Route, Switch} from "react-router-dom";
import Explorer from "./Components/Explorer/Explorer";
import Blockchain from "./Components/Blockchain/Blockchain";
import BlockDetail from "./Components/Blockchain/BlockDetail";
import TransactionsList from "./Components/Transactions/TransactionsList";
import TransactionDetail from "./Components/Transactions/TransactionDetail";
import UnspentTxOuts from "./Components/UnspentTransactionOutputs/UnspentTxOuts";
import AddressDetail from "./Components/Address/AddressDetail";
import SplashScreen from "./Components/SplashScreen/SplashScreen";

const MyRouter = () => (
    <Switch>
        <Route path='/explorer'><Explorer/></Route>

        <Route path='/blockchain'><Blockchain/></Route>
        <Route path='/block'><BlockDetail/></Route>

        <Route path='/transactions'><TransactionsList/></Route>
        <Route path='/transactions-pool'><TransactionsList/></Route>
        <Route path='/transaction/:id'><TransactionDetail/></Route>

        <Route path='/unspent-transaction-outputs'><UnspentTxOuts/></Route>

        <Route path='/address/:address'><AddressDetail/></Route>

        <Route path='/'><SplashScreen/></Route>
    </Switch>
);

export default MyRouter;
