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
            id: -1,
            rowClick: null,
            dataChart:[],
            
        }
    }


    componentDidMount() {
    }

    updateDataChartFromItemChart=(dataFromItemChart)=>{
        this.setState({
            dataChart:dataFromItemChart
        })

    }

    updateDataChartFromTableClick = (rowClick) => {
        let dataChart = this.state.dataChart;

        if(!this.checkExistData(dataChart,rowClick))
        {
            dataChart.push(rowClick);
            this.setState({
                dataChart: dataChart
            })
        }
        //console.log(JSON.stringify(this.state.dataChart))

    }

    checkExistData = (dataChart,rowClick)=>{


        let result = false;
        dataChart.map((row, indexRow) => {
            if(row.id==rowClick.id)
            {
                result = true;
            }
        })
        return result;
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
                                <i className="fas fa-expand-arrows-alt"></i>
                            </div>
                        </div>
                        <div className="chart-macro">
                            <ChartMacro dataChart={this.state.dataChart} />
                        </div>

                    </div>

                    <div className="item-chart-macro">
                        <ItemChart dataChart={JSON.stringify(this.state.dataChart)} updateDataChartFromItemChart={this.updateDataChartFromItemChart}/>

                    </div>
                </div>
                <div className="macro-nav-container">
                    <Switch>
                        <Route path="/vi-mo/:key_id_macro/:key_id" component={(MacroData)} />

                    </Switch>
                    <div className='table-data'>
                        {/* <Route path="/vi-mo/:key_id_macro/:key_id" component={(TableDataMacro)} /> */}
                        <Route
                            path="/vi-mo/:key_id_macro/:key_id"
                            render={(props) => <TableDataMacro {...props} authed={true} updateDataChartFromTableClick={this.updateDataChartFromTableClick} />}
                        />
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
