import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";




class GDPYear extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log("GDPYear")
        return (
            <Fragment>
                GDPYear
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GDPYear);
