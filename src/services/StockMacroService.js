import axios from "../axios"



const getAllSelect=(inputId)=>{
    return axios.get(`/api/get-all-select`);
}
const getMarketRatio=(inputId)=>{
    return axios.get(`/api/get-market-ratio-by-code?code=${inputId}`);
}
const getFinishedProfitPlan=(inputId)=>{
    return axios.get(`/api/get-finished-profit-plan?id=${inputId}`);
}
export { getAllSelect,
    getMarketRatio,
    getFinishedProfitPlan
 }