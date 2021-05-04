import axios from "axios";
import {api} from "./api";

export const getTransactionsPoolService = () => {
    return axios.get(api + '/transaction-pool')
}

export const getTransactionByIdService = (id) => {
    return axios.get(api + '/transaction/' + id)
}

export const getPoolSizeService = () => {
    return axios.get(api + '/pool-size');
}
