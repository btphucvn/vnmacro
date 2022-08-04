import axios from "../axios"



const getAllMacro = () => {
    return axios.get(`/api/get-all-macro`);
}



export {
    getAllMacro,
    

}