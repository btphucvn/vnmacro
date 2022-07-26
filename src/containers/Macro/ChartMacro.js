import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import faker from 'faker';


import { Chart } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
} from 'chart.js';
ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
);


class Macro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            labels: null,
            datasets: null,
            options: null,
        }
    }

    componentDidMount() {
        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        const options = {
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        display: false //this will remove only the label
                    }
                },
                y: {
                    grid: { display: false },
                    position: 'right'
                }
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    align: "middle"
                }
            },
            interaction: {
                intersect: false,
            },
            elements: {
                point: {
                    radius: 0
                }
            },
        }
        const data = {
            labels,
            datasets: [
                {
                    id: 1,
                    type: 'line',
                    label: 'Dataset 1',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 3,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                    order:0,
                    //yAxisID: 'y-axis-0',

                    
                },
                {
                    id: 1,
                    type: 'line',
                    label: 'Dataset 1',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 3,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    data: labels.map(() => faker.datatype.number({ min: 10000, max: 20000 })),
                    order:0,
                    //yAxisID: 'y-axis-1',
                },

            ],
        };

        this.setState({
            data: data,
            options: options
        })
    }

    render() {


        return (
            <Fragment>

                {/* {
                    (this.state.data &&
                        <Chart ref='chart' type='line' data={this.state.data} options={this.state.options} />
                    )
                } */}

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
