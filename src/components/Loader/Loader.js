import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { createChart } from 'lightweight-charts';
import "./Loader.scss";



class Loader extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <Fragment>
                <div class="loader-container">
                    <div class="loader"></div>

                </div>



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

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
