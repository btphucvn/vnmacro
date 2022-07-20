import axios from "../axios"



const getMacroTypeByKeyIDMacro = (keyIDMacro) => {
    return axios.get(`/api/get-macro-type?keyIDMacro=${keyIDMacro}`);
}

export {
    getMacroTypeByKeyIDMacro,

}