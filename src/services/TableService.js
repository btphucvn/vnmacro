import axios from "../axios"

const getTableByKeyIDMactoType = (key_id_macro_type,valueType) => {
    return axios.get(`/api/get-table-by-keyidmacrotype?key_id_macro_type=${key_id_macro_type}&value_type=${valueType}`);
}

export {
    getTableByKeyIDMactoType,

}