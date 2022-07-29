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


const arrColor = ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
    '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];

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


class ItemChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataChart: null,
            items: null,
        };
        this.onDragEnd = this.onDragEnd.bind(this);
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

            dataChart.map((item,index)=>{
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
        if (props.dataChart != JSON.stringify(this.setState.dataChart)) {
            let dataChart = JSON.parse(props.dataChart);
            //console.log(dataChart);
            dataChart.map((item, index) => {
                if (item.color == null) {
                    item.color = this.getColor(dataChart);
                }
                item.zindex = index;
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
        if (!result.destination) {
            return;
        }

        const dataChart = await reorder(
            this.state.dataChart,
            result.source.index,
            result.destination.index
        );
        dataChart.map((item, index) => {
            item.zindex = index;
        })
        this.props.updateDataChartFromItemChart(dataChart);
        // this.setState({
        //     dataChart: dataChart
        // });
        //console.log(this.state.items);
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    handleOnClickDelete = (id) => {
        let dataChart = this.state.dataChart;

        dataChart = dataChart.filter(function( obj ) {
            return obj.id !== id;
          });
        this.props.updateDataChartFromItemChart(dataChart);


    }
    handleChangeColor = (event, id) => {

        let dataChart = this.state.dataChart;
        dataChart.map((item,index)=>{
            if(item.id==id)
            {
                item.color=event.target.value;
            }
        })
        this.props.updateDataChartFromItemChart(dataChart);
        // this.setState({
        //     dataChart:dataChart
        // })
    }
    render() {
        //console.log("rerender itemchart.js")

        //console.log(this.state.items)
        return (
            <Fragment>
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

                                                            <div className='chart-items'>
                                                                <i className="fas fa-chart-line chart-icon"></i>

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
                                                                <i id={item.id} className="fas fa-times" onClick={(id)=>this.handleOnClickDelete(item.id)}></i>

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
