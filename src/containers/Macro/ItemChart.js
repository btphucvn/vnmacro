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
            dataChart:null,
            items: getItems(10)
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentDidMount()
    {
        //let dataChart = this.props.match.params.dataChart;
        console.log(this.props);
    }
    componentDidUpdate(prevProps) {
        //console.log(prevProps);
      }
    componentWillReceiveProps(props)
    {
        //console.log(props.dataChart);
        console.log(JSON.parse(props.dataChart))
    }
    
    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        });
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    handleOnClickDelete = () => {
    }
    handleChangeColor = (event) => {
        console.log(event.target.value);
    }
    render() {
        //console.log("rerender itemchart.js")

        //console.log("item chart: "+this.state.items)
        return (
            <Fragment>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <RootRef rootRef={provided.innerRef}>
                                <List style={getListStyle(snapshot.isDraggingOver)}>
                                    {this.state.items.map((item, index) => (
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
                                                        <i className="fas fa-chart-line chart-item"></i>
                                                        <input type="color" onChange={this.handleChangeColor} value="#45306c" ></input>
                                                        <ListItemText
                                                            primary={item.primary}
                                                        />
                                                    </div>

                                                    {/* <ListItemSecondaryAction>
                                                        <i className="far fa-trash-alt" onClick={this.handleOnClickDelete}></i>

                                                    </ListItemSecondaryAction> */}
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
