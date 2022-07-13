import axios from "../axios"



const getAllQuantities = () => {
    return axios.get(`/api/get-all-quantites`);
}

export {
    getAllQuantities,

}