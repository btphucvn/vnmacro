class CommonUtils {
    static isNumber1 (number) {
        if (number === 1) return true;
        return false;
    }
    static numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

}

export default CommonUtils;