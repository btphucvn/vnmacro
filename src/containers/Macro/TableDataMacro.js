import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './TableDataMacro.scss'
import { getAllQuantities } from '../../services/QuantitiesService'
import { Link, withRouter } from 'react-router-dom';


class TableDataMacro extends Component {

    constructor(props) {
        super(props);
        //console.log(props);
        this.state={
            keyLink:"",
        }

    }
     componentDidMount() {

    }
    render() {
        return (
            <Fragment>
                aaaaa
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

export default connect(mapStateToProps, mapDispatchToProps)(TableDataMacro);
