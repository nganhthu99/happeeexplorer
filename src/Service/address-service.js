import axios from "axios";
import {api} from "./api";

export const getBalanceByAddress = (address) => {
    return axios.get(api + '/balance/' + address)
}
