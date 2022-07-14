import axios from "../axios"



const getMacroTypeByMacroKeyID = (macroKeyID) => {
    return axios.get(`/api/get-macro-type?macroKeyID=${macroKeyID}`);
}

export {
    getMacroTypeByMacroKeyID,

}