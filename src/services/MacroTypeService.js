import axios from "../axios"



const getMacroTypeByKeyIDMacro = (keyIDMacro) => {
    return axios.get(`/api/get-macro-type?keyIDMacro=${keyIDMacro}`);
}
const getValueTypeByKeyIDMactoType = (keyIDMacro) => {
    return axios.get(`/api/get-value-type-by-keyidmacrotype?keyIDMacro=${keyIDMacro}`);
}


export {
    getMacroTypeByKeyIDMacro,
    getValueTypeByKeyIDMactoType,

}