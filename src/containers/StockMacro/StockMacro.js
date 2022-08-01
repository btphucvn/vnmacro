import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import "./StockMacro.scss";
import ChartRatio from '../../components/Chart/ChartRatio';
import { getAllSelect, getMarketRatio, getFinishedProfitPlan } from '../../services/StockMacroService'
import CommonUtils from '../../utils/CommonUtils';




class StockMacro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataChartPE: null,
            dataChartPB: null,
            selectOptions: null,
            numberOfStock: 0,
            postTaxProfit: "N/A",
            postTaxProfitPlan: "N/A",
            finishedPercent: "N/A"
        }
    }

    formatSelectOptions = (selectOptions) => {
        let options = [];
        if (selectOptions) {
            for (let i = 0; i < selectOptions.length; i++) {
                let option = {};
                option.value = selectOptions[i].id;
                option.label = selectOptions[i].name_vi;
                options.push(option);
            }
        }


        return options;
    }

    async componentDidMount() {
        window.addEventListener('resize', this.updateChartWidth);
        const selectOptionsData = await getAllSelect();
        const selectOptions = this.formatSelectOptions(selectOptionsData.data);
        const data = await getMarketRatio("VNINDEX");
        const finishedProfitPlan = await getFinishedProfitPlan("VNINDEX");

        const dataChartPE = data.pe;
        const dataChartPB = data.pb;
        if (dataChartPE) {
            this.setState({
                dataChartPE: dataChartPE,
            })
        }
        if (dataChartPB) {
            this.setState({
                dataChartPB: dataChartPB,
            })
        }

        if (selectOptions) {
            this.setState({
                selectOptions: selectOptions,
            })
        }
        if (finishedProfitPlan.data && finishedProfitPlan.data.numberOfStock) {
            this.setState({
                numberOfStock: finishedProfitPlan.data.numberOfStock,
            })
        }

        if (finishedProfitPlan.data && finishedProfitPlan.data.postTaxProfitPlan != null) {
            this.setState({
                postTaxProfitPlan: CommonUtils.numberWithCommas(Math.round(finishedProfitPlan.data.postTaxProfitPlan / 1000000000, 0)),
            })
        }
        if ( finishedProfitPlan.data && finishedProfitPlan.data.postTaxProfit) {
            this.setState({
                postTaxProfit: CommonUtils.numberWithCommas(Math.round(finishedProfitPlan.data.postTaxProfit / 1000000000, 0)),
            })
        }
        if (finishedProfitPlan.data && finishedProfitPlan.data.finishedPercent) {
            this.setState({
                finishedPercent: finishedProfitPlan.data.finishedPercent,
            })
        }
    }

    updateChartWidth = () => {
        console.log(window.innerWidth);
        //chart.applyOptions({ height: document.getElementById("chartPE").offsetHeight, width: document.getElementById("center-vnindex").offsetWidth });

    }

    handleOnChangeSelect = async (selectedOption) => {
        const finishedProfitPlan = await getFinishedProfitPlan(selectedOption.value);
        let response = await getMarketRatio(selectedOption.value);
        if (response.pe) {
            this.setState({
                dataChartPE: response.pe,
            })
        }
        if (response.pb) {
            this.setState({
                dataChartPB: response.pb,
            })
        }

        this.setState({
            numberOfStock: finishedProfitPlan.data.numberOfStock,
        })

        if (finishedProfitPlan.data.postTaxProfitPlan != null) {
            this.setState({
                postTaxProfitPlan: CommonUtils.numberWithCommas(Math.round(finishedProfitPlan.data.postTaxProfitPlan / 1000000000, 0)),
            })
        }
        if (finishedProfitPlan.data.postTaxProfit) {
            this.setState({
                postTaxProfit: CommonUtils.numberWithCommas(Math.round(finishedProfitPlan.data.postTaxProfit / 1000000000, 0)),
            })
        }
        if (finishedProfitPlan.data.finishedPercent) {
            this.setState({
                finishedPercent: finishedProfitPlan.data.finishedPercent,
            })
        }
    }
    render() {
        return (
            <Fragment>
                <div className="stock-macro-container">
                    <div className='select-index'>
                        <Select
                            options={this.state.selectOptions}
                            className="select"
                            defaultValue={{ value: 'VNINDEX', label: 'VNINDEX' }}
                            onChange={this.handleOnChangeSelect}
                        />
                    </div>
                    <div className='ratio-container'>
                        <div className="pe-container">
                            <h2 className="pe-span">PE</h2>

                            {
                                this.state.dataChartPE &&
                                <ChartRatio
                                    chartID="chartPE"
                                    dataChart={this.state.dataChartPE}
                                />

                            }
                        </div>
                        <div className="pb-container">
                            <div className="pb-span">PB</div>
                            {
                                this.state.dataChartPB &&
                                <ChartRatio
                                    chartID="chartPB"
                                    dataChart={this.state.dataChartPB}
                                />

                            }
                        </div>
                    </div>
                    <div className='plan-and-leverage-container'>
                        <div className="plan-profit-container">
                            <div className="title-plan-profit-container">
                                <h2 className="title-plan">Kế hoạch năm 2022</h2>


                            </div>
                            <div className='plan-profit'>

                                <div className='table-plan-profit'>
                                    <table className="table">

                                        <tbody>
                                            <tr>
                                                <td>Số lượng cổ phiếu khảo sát</td>
                                                <td>{this.state.numberOfStock}</td>


                                            </tr>
                                            <tr>
                                                <td>Tổng lợi nhuận sau thuế đã thực hiện</td>
                                                <td>{this.state.postTaxProfit}</td>
                                            </tr>
                                            <tr>
                                                <td>Tổng lợi nhuận sau thuế kế hoạch</td>
                                                <td>{this.state.postTaxProfitPlan}</td>
                                            </tr>
                                            <tr>
                                                <td>Tiến độ đã thực hiện được</td>
                                                <td>{this.state.finishedPercent}%</td>
                                            </tr>
                                            <tr>
                                                <td className="money-type">Đơn vị tỷ đồng</td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="progress-plan-profit">
                                    <div className="progress-container">
                                        <div className="progress progress-bar-vertical">
                                            <div className="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ "height": this.state.finishedPercent }}>
                                                <span>{this.state.finishedPercent}%</span>
                                            </div>
                                        </div>

                                        <div className='title-progress'>Tiến độ hoàn thành kế hoạch 2022</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='leverage-container'>

                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(StockMacro);
