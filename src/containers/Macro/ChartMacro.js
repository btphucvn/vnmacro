import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

class Macro extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
 
    }

    render() {


        return (
            <Fragment>


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

export default connect(mapStateToProps, mapDispatchToProps)(Macro);
