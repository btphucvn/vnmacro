import axios from "../axios"



const getMacroTypeByKeyIDMacro = (key_id_macro) => {
    return axios.get(`/api/get-macro-type?key_id_macro=${key_id_macro}`);
}
const getValueTypeByKeyIDMactoType = (key_id_macro) => {
    return axios.get(`/api/get-value-type-by-keyidmacrotype?key_id_macro=${key_id_macro}`);
}


export {
    getMacroTypeByKeyIDMacro,
    getValueTypeByKeyIDMactoType,

}