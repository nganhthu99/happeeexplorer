import axios from "axios";
import {api} from "./api";

export const getBlockchainService = () => {
    return axios.get(api + '/blocks')
}

export const getBlockByHashService = (hash) => {
    return axios.get(api + '/block?hash=' + hash)
}

export const getBlockByIndexService = (index) => {
    return axios.get(api + '/block?index=' + index)
}

export const getChainLengthService = () => {
    return axios.get(api + '/chain-length');
}

export const getDifficultyService = () => {
    return axios.get(api + '/difficulty');
}
