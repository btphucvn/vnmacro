import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    ListItemSecondaryAction
} from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable }
    from "react-beautiful-dnd";
import './ItemChart.scss'

import Modal from "react-modal";
import lineChart from "../../assets/images/spline-chart.svg";
import columnChart from "../../assets/images/column-chart.svg";
import areaChart from "../../assets/images/area-chart.svg";
import columnStackChart from "../../assets/images/column-stack-chart.svg";

import columnPercentStackChart from "../../assets/images/column-percent-stack.svg";

const arrColor = ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
    '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];

const typeCharts = [
    { type: "spline", title: "Đường", img: lineChart },
    { type: "column", title: "Cột", img: columnChart },
    { type: "area", title: "Miền", img: areaChart },
    { type: "column-stack", title: "Cột chồng", img: columnStackChart },
    { type: "column-percent-stack", title: "Cột chồng 100%", img: columnPercentStackChart }


];


const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        primary: `item ${k} `,
        // secondary: k % 2 === 0 ? `Whatever for ${k}` : undefined
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
        background: "rgb(235,235,235)"
    })
});


const getListStyle = isDraggingOver => ({
    //background: isDraggingOver ? 'lightblue' : 'lightgrey',
});
let clickedID = null;


class ItemChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataChart: null,
            items: null,
            isOpen: false,
            setIsOpen: false,
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    toggleModal = (id) => {
        clickedID = id;
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    componentDidMount() {
        // //let dataChart = this.props.match.params.dataChart;
        // //console.log(this.props);
        // let dataChart = JSON.parse(this.props.dataChart);
        // if (dataChart) {
        //     this.setState({
        //         dataChart: dataChart
        //     })
        // }
    }

    getColor(dataChart) {

        for (let i = 0; i < arrColor.length; i++) {
            let exitsColor = false;

            dataChart.map((item, index) => {
                if (item.color != undefined && item.color == arrColor[i]) {
                    exitsColor = true;
                }
            });
            if (exitsColor == false) {
                return arrColor[i];
            }

        }
        return Math.floor(Math.random() * 16777215).toString(16);
    }

    componentWillReceiveProps(props) {

        if (JSON.stringify(this.state.dataChart) != JSON.stringify(props)) {
            let dataChart = JSON.parse(props.dataChart);
            //console.log(dataChart);
            dataChart.map((item, index) => {
                if (item.color == null) {
                    item.color = this.getColor(dataChart);
                }
                if (item.type == null) {
                    item.type = "spline";
                }
                //item.zindex = index;
            })


            if (dataChart) {
                this.setState({
                    dataChart: dataChart,
                })
            }
            this.props.updateDataChartFromItemChart(dataChart);
        }
    }

    async onDragEnd(result) {

        // dropped outside the list
        // if (!result.destination) {
        //     return;
        // }

        const dataChart = await reorder(
            this.state.dataChart,
            result.source.index,
            result.destination.index
        );
        // dataChart.map((item, index) => {
        //     item.zindex = index;
        // })
        this.props.updateDataChartFromItemChart(dataChart);
        this.setState({
            dataChart: dataChart
        });
        console.log(this.state.dataChart);
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    handleOnClickDelete = (id) => {
        let dataChart = this.state.dataChart;

        dataChart = dataChart.filter(function (obj) {
            return obj.id !== id;
        });
        this.props.updateDataChartFromItemChart(dataChart);


    }
    handleOnclickModalItem = (type) => {
        let dataChart = this.state.dataChart;
        dataChart.map((item, index) => {
            if (item.id == clickedID) {
                item.type = type;
                if (type == "column-stack") {
                    item.type = "column";
                    item.stack = "stack";
                    item.stacking= 'normal';
                }
                if (type == "column-percent-stack") {
                    item.type = "column";
                    item.stack = "percent";
                    item.stacking= 'percent';
                }
                if(type=="column")
                {
                    item.stack = item.id;
                    // item.stacking= 'normal';
                    delete item.stacking;
                }

            }

            // if (item.stack != "stack") {
            //     delete item.stacking;

            // }
        })
        this.toggleModal(null);
        //console.log(dataChart);
        this.props.updateDataChartFromItemChart(dataChart);
    }
    handleChangeColor = (event, id) => {

        let dataChart = this.state.dataChart;
        dataChart.map((item, index) => {
            if (item.id == id) {
                item.color = event.target.value;
            }
        })
        this.props.updateDataChartFromItemChart(dataChart);
        // this.setState({
        //     dataChart:dataChart
        // })
    }
    getTypeChartByType(type, stacking) {
        if (stacking=="normal") {
            type = "column-stack";
        }
        if (stacking=="percent") {
            type = "column-percent-stack";
        }
        if(stacking==undefined && type.includes("column"))
        {
            type="column";
        }
        for (let i = 0; i < typeCharts.length; i++) {
            if (type == typeCharts[i].type) {
                return typeCharts[i].img
            }
        }

    }
    render() {
        //console.log("rerender itemchart.js")

        //console.log(this.state.items)
        return (
            <Fragment>

                <Modal
                    isOpen={this.state.isOpen}
                    onRequestClose={this.toggleModal}
                    contentLabel="My dialog"
                    className="modal-select-chart"
                >
                    <div className='modal-header-type-chart'>
                        <div className='modal-header-none'>
                        </div>
                        <div className='modal-header-title'>
                            <span>Chọn loại biểu đồ</span>
                        </div>
                        <div className='modal-header-close'>
                            <i onClick={this.toggleModal} class="fas fa-times-circle modal-header-button-close"></i>
                        </div>
                    </div>
                    <div className='modal-chart-type'>
                        {

                            typeCharts.map((typeChart, index) => {
                                return (
                                    <div className='line-chart hover-chart' onClick={() => this.handleOnclickModalItem(typeChart.type)}>
                                        <div className="image"
                                            style={{
                                                backgroundImage: `url(${typeChart.img})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center center',
                                                backgroundRepeat: 'no-repeat',
                                            }}
                                        ></div>
                                        <span>{typeChart.title}</span>
                                    </div>
                                );
                            })
                        }



                    </div>
                    <div className='modal-submit'></div>

                </Modal>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <RootRef rootRef={provided.innerRef}>
                                <List style={getListStyle(snapshot.isDraggingOver)}>
                                    {this.state.dataChart &&
                                        this.state.dataChart.map((item, index) => (

                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <ListItem
                                                        ContainerComponent="li"
                                                        ContainerProps={{ ref: provided.innerRef }}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                    >

                                                        <div className="content-item">

                                                            <div className='chart-items' onClick={() => this.toggleModal(item.id)}
                                                                style={{
                                                                    backgroundImage: `url(${this.getTypeChartByType(item.type, item.stacking)})`,
                                                                    backgroundSize: 'cover',
                                                                    backgroundRepeat: 'no-repeat',
                                                                }}
                                                            >
                                                                {/* <i onClick={() => this.toggleModal(item.id)} className="fas fa-chart-line chart-icon"></i> */}

                                                            </div>
                                                            <div className='input-color'>
                                                                <input type="color" onChange={event => this.handleChangeColor(event, item.id)} value={item.color} ></input>
                                                            </div>
                                                            <ListItemText
                                                                primary={item.name}
                                                            />
                                                        </div>

                                                        <ListItemSecondaryAction>
                                                            <div className='delete-item'>
                                                                <i id={item.id} className="fas fa-times" onClick={(id) => this.handleOnClickDelete(item.id)}></i>

                                                            </div>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>

                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </List>
                            </RootRef>
                        )}
                    </Droppable>
                </DragDropContext>
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemChart);
