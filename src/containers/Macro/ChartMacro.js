import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { drop } from 'lodash';



class Macro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //series:null,
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
                    lineColor: 'transparent'

                },
                plotOptions: {
                    column: {
                        borderWidth: 0,
                        shadow: false
                    },
                    spline: {
                        shadow: true,
                        pointRange: 100,
                    }
                },
                // yAxis: [{title:""},{title:""}],

                // series: [{
                //     yAxis: 0,
                //     data: [1, 2, 3, 4]
                // }, {
                //     yAxis: 0,
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
            serie.zindex = data.zindex;
            serie.data = data.data;
            if (!data.type) {
                data.type = "spline"
            }
            serie.type = data.type;

            serie.yAxis = 0;
            series.push(serie);
        })
        let options = this.state.options;
        options.series = series;
        this.setState = ({
            options: options
        })
        //console.log(options);
    }


    render() {


        return (
            <Fragment>

                <HighchartsReact
                    containerProps={{ style: { height: "100%" } }}
                    highcharts={Highcharts}
                    options={this.state.options}
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

export default connect(mapStateToProps, mapDispatchToProps)(Macro);
