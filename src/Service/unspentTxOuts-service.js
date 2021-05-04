import axios from "axios";
import {api} from "./api";

export const getUnspentTxOutsService = () => {
    return axios.get(api + '/unspent-transaction-outs')
}
