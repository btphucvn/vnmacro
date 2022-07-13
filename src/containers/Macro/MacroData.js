import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './MacroData.scss'
import { getAllQuantities } from '../../services/QuantitiesService'
import { Link, useParams } from 'react-router-dom';
import TableDataMacro from './TableDataMacro';


class MacroData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataNav: null,
            selected: -1,
            keySelected:"",
        }

    }
    async componentDidMount() {
        const data = await getAllQuantities();
        if (data.errCode == 0 && data.data.length > 0) {
            const dataNav = data.data.reverse();
            this.setState({
                dataNav: dataNav,
                selected:0,
                keySelected:dataNav[0].keyQuantity,
            })
        }
    }
     handleOnClickNav = async (item,index) => {

        await this.setState({
            selected:index,
            keySelected:item.keyQuantity,
        })

    }
    render() {
        let arrDataNav = this.state.dataNav;
        console.log(this.state)
        return (
            <Fragment>
                <div className="macro-nav-container">
                    <div className='title-container'>
                        <ul>
                            {
                                arrDataNav && arrDataNav.length > 0 && arrDataNav.map((item, index) => {
                                    if (index === this.state.selected) {
                                        
                                        return (
                                            <li>
                                                <Link className='active' to={"/vi-mo/san-luong/" + item.keyQuantity} onClick={() => this.handleOnClickNav(item,index)}>{item.title}</Link>
                                            </li>
                                        );
                                    }
                                    else {
                                        
                                        return (
                                            <li>
                                                <Link to={"/vi-mo/san-luong/" + item.keyQuantity} onClick={() => this.handleOnClickNav(item,index)}>{item.title}</Link>
                                            </li>
                                        );
                                    }
                                })

                            }
                        </ul>
                    </div>
                    <div className='table-data'>
                        <TableDataMacro keyLink={this.state.keySelected}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MacroData);
