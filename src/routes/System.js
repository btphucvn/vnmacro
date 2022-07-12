import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductManage from '../containers/System/ProductManage';
import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';
import StockMacro from '../components/StockMacro/StockMacro';
import Header from '../containers/Header/Header';

class System extends Component {
    render() {


        const { systemMenuPath } = this.props;
        return (
            <React.Fragment>
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/aaa" component={StockMacro} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
