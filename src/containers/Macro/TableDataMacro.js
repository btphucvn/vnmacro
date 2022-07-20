import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './TableDataMacro.scss'
import { getAllQuantities } from '../../services/QuantitiesService'
import { Link, withRouter } from 'react-router-dom';


class TableDataMacro extends Component {

    constructor(props) {
        super(props);
        this.state={
            keyID:"",
            idMacro:-1,
        }

    }
    componentWillReceiveProps(props)
    {
        console.log(this.props)

        this.setState({
            keyID: props.match.params.keyID,
            idMacro:props.idMacro
        })
    }
    componentDidMount() {
    }
    render() {
        return (
            <Fragment>
                {this.state.keyID+" "+this.state.idMacro}
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
