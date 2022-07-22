import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import Navigator from '../../components/Navigator';
import { adminMenu } from '../Header/menuApp';
import ChartMacro from './ChartMacro';
import "./Macro.scss";
import { Route, Switch } from 'react-router-dom';

import Select from 'react-select'
import ItemChart from './ItemChart';
import MacroData from './MacroData';
import TableDataMacro from './TableDataMacro';
const options = [
    { value: 'ALL', label: 'ALL' },
    { value: '3M', label: '3M' },
    { value: '6M', label: '6M' },
    { value: '1y', label: '1y' },
    { value: '7y', label: '7y' },
    { value: '10y', label: '10y' }

]
const customStyles = {

};
class Macro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
        }
    }


    componentDidMount() {
        //console.log(this.props);
    }

    render() {
        return (
            <Fragment>
                <div className="macro-header-container">
                    {/* thanh navigator */}
                    <div className="macro-header-tabs-container">
                        <Navigator menus={adminMenu} />
                    </div>
                </div>
                <div className="macro-container">
                    <div className="chart-macro-container">
                        <div className="chart-macro-header">
                            <div className="select-time-scale">
                                <Select options={options} defaultValue={{ value: 'ALL', label: 'ALL' }} />
                            </div>
                            <div className='expand-modal-chart'>
                                <i class="fas fa-expand-arrows-alt"></i>
                            </div>
                        </div>
                        <div className="chart-macro">
                            <ChartMacro />
                        </div>

                    </div>

                    <div className="item-chart-macro">
                        <ItemChart />
                    </div>
                </div>
                <div className="macro-nav-container">
                    <Switch>
                        <Route path="/vi-mo/:keyIDMacro/:keyID" component={(MacroData)} />

                    </Switch>
                    <div className='table-data'>
                        <Route path="/vi-mo/:keyIDMacro/:keyID" component={(TableDataMacro)} />
                    </div>
                </div>

            </Fragment >
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
