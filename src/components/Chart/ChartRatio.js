import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { createChart } from 'lightweight-charts';




class ChartRatio extends Component {

    constructor(props) {
        super(props);
        //console.log(this.props.dataChart);
        this.state = {
            containerId: this.props.chartID,
            chartPE: null,
            lineSeries: null
        }
    }
    componentWillReceiveProps(props) {
        this.state.chartPE.removeSeries(this.state.lineSeries);
        const lineSeries = this.state.chartPE.addLineSeries();
        lineSeries.setData(props.dataChart);
        this.setState({
            lineSeries: lineSeries
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {


    }
    componentDidMount() {
        const chartPE = createChart(this.state.containerId,
            {
                width: window.innerWidth * 0.45,
                height: 300,
                grid: {
                    vertLines: false,
                    horzLines: false,
                },
                rightPriceScale: {
                    visible: true,
                },
                leftPriceScale: {
                    visible: false,
                },
            });

        const lineSeries = chartPE.addLineSeries({
            color: '#185ba8',
            lineWidth: 2,
        });

        lineSeries.setData(this.props.dataChart);


        this.setState({
            chartPE: chartPE,
            lineSeries: lineSeries
        })

    }
    updateChartWidth=()=>{
        console.log(window.innerWidth);
        //chart.applyOptions({ height: document.getElementById("chartPE").offsetHeight, width: document.getElementById("center-vnindex").offsetWidth });

    }
    componentWillUnmount() {
        if (this.state.chartPE !== null) {
            this.state.chartPE.remove();
            this.state.chartPE = null;
        }
    }

    render() {

        return (
            <Fragment>

                <div
                    id={this.state.containerId}
                    className={this.props.chartID}
                />


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

export default connect(mapStateToProps, mapDispatchToProps)(ChartRatio);
