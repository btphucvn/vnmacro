import axios from "../axios"

const getTableByKeyIDMactoType = (keyIDMacroType,valueType) => {
    return axios.get(`/api/get-table-by-keyidmacrotype?keyIDMacroType=${keyIDMacroType}&valueType=${valueType}`);
}

export {
    getTableByKeyIDMactoType,

}