import axios from "../axios"



const getMacroData = (key_id_macro_type, value_type) => {
    return axios.get(`/api/get-macro-data?key_id_macro_type=${key_id_macro_type}&value_type=${value_type}`);
}


export {
    getMacroData,

}