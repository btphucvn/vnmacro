import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { drop } from 'lodash';
import Select from 'react-select'
import Modal from "react-modal";




class Macro extends Component {

    constructor(props) {
        super(props);
        // this.chartComponent = React.createRef();
        this.state = {
            selectRangeOption: [
                { value: 0, label: 'ALL' },
                { value: (Math.floor(Date.now() / 1000) - (365 * 3 * 86400)) * 1000, label: '3y' },
                { value: (Math.floor(Date.now() / 1000) - (365 * 5 * 86400)) * 1000, label: '5y' },
                { value: (Math.floor(Date.now() / 1000) - (365 * 10 * 86400)) * 1000, label: '10y' }

            ],
            isOpen: false,
            options: {
                title: {
                    text: null
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    gridLineWidth: 0,
                    type: 'datetime',
                    lineColor: 'transparent',
                    min: (Math.floor(Date.now() / 1000) - (365 * 10 * 86400)) * 1000,
                    //min: 1496250000000
                    tickInterval: 1000 * 60 * 60 * 24 * 365,
                    ordinal: false,

                },
                plotOptions: {
                    column: {
                        borderWidth: 0,
                        shadow: false,
                        //stacking: 'normal',
                        groupPadding: 0.2,

                    },
                    spline: {
                        shadow: true,
                        pointRange: 100,
                    }
                },
                // yAxis: [{title:""},{title:""}],

                // series: [{
                //     yAxis: 0,
                //     type:"column",
                //     stack:"stack",
                //     data: [1, 2, 3, 4]
                // }, {
                //     yAxis: 0,
                //     type:"column",
                //     stack:"stack",
                //     data: [4, 3, 2, 1]
                // }, {
                //     yAxis: 0,
                //     data: [6, 6, 6, 6]
                // }, {
                //     yAxis: 1,
                //     data: [245, 523, 674, 734]
                // }, {
                //     yAxis: 1,
                //     data: [200, 300, 400, 500]
                // }]

                yAxis: {
                    gridLineWidth: 0,
                    title: "",
                },

                series: []
            }
        }
    }

    componentDidMount() {

    }
    handleClick = event => {
        event.preventDefault();
        console.log("aaaa")
        this.setState({ isOpen: true }, () => {
            document.addEventListener("click", this.closeMenu);
        });
    };
    closeMenu = () => {
        this.setState({ isOpen: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }
    componentWillReceiveProps(props) {
        const dataChart = props.dataChart;
        //console.log(dataChart)

        let series = [];
        dataChart.map((data, index) => {
            let serie = {};
            serie.marker = {
                enabled: false
            };
            serie.name = data.name;
            serie.color = data.color;
            // serie.zindex = data.zindex;
            serie.data = data.data;
            
            if (!data.type) {
                data.type = "spline"
            }
            if (data.stack) {
                serie.stack = data.stack;
            }
            if (data.stacking) {
                serie.stacking = data.stacking;
            }
            serie.type = data.type;
            serie.yAxis = 0;
            series.push(serie);
        })
        let options = this.state.options;
        options.series = series;

        let selectRangeOption = this.state.selectRangeOption;
        selectRangeOption[0].value = this.getOldestTimeStamp(options);

        this.setState({
            options: options,
            selectRangeOption: selectRangeOption
        })
        //console.log(selectRangeOption);
        console.log(options);
    }
    getOldestTimeStamp(options) {
        const series = options.series;
        let oldestTimestamp = 999999999999999;
        for (let serie of series) {
            let tmp = serie.data[0][0];
            if (tmp < oldestTimestamp) {
                oldestTimestamp = tmp;
            }
        }
        return oldestTimestamp;
    }
    handleChangeSelectRange = (selected) => {

        let options = this.state.options;
        options.xAxis.min = selected.value;

        this.setState({
            options: options
        })

        // const chart = this.chartComponent.current?.chart;

        // if (chart) chart.redraw();
        //console.log(options);
        //console.log(selected.value);

    }
    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }


    render() {


        return (
            <Fragment>
                <div className="chart-macro-header">
                    <div className="select-time-scale">
                        <Select options={this.state.selectRangeOption}
                            defaultValue={{ value: Math.floor(Date.now() / 1000) - (365 * 10 * 86400), label: '10y' }}
                            value={this.state.value}
                            onChange={(value) => this.handleChangeSelectRange(value)}
                        />
                    </div>
                    <div className='expand-modal-chart'>
                        <i onClick={this.toggleModal} className="fas fa-expand-arrows-alt"></i>
                    </div>
                </div>
                <div className='chart-macro'>
                    <HighchartsReact
                        // ref={this.chartComponent}
                        containerProps={{ style: { height: "100%" } }}
                        highcharts={Highcharts}
                        options={this.state.options}
                    />
                </div>
                <Modal
                    isOpen={this.state.isOpen}
                    onRequestClose={this.toggleModal}
                    contentLabel="My dialog"
                    className="chart-macro-modal"
                >
                    <div className="chart-macro-header-modal">
                        <div className="select-time-scale">
                            <Select options={this.state.selectRangeOption}
                                defaultValue={{ value: Math.floor(Date.now() / 1000) - (365 * 5 * 86400), label: '5y' }}
                                value={this.state.value}
                                onChange={(value) => this.handleChangeSelectRange(value)}
                            />
                        </div>
                    </div>
                    <HighchartsReact
                        containerProps={{ style: { height: "80%" } }}
                        highcharts={Highcharts}
                        options={this.state.options}
                    />
                </Modal>
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
