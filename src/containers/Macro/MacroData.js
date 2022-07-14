import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './MacroData.scss'
import { getAllQuantities } from '../../services/QuantitiesService'
import { Link, useParams } from 'react-router-dom';
import TableDataMacro from './TableDataMacro';
import { Route, Switch } from 'react-router-dom';
import { getMacroTypeByMacroKeyID } from '../../services/MacroTypeService'


class MacroData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataNav: null,
            selected: -1,
            keySelected: "",
            keyID: "",
        }

    }
    async componentWillReceiveProps(props) {
        if (props.match.params.macroKeyID == this.props.match.params.macroKeyID) {
            const dataNav = this.state.dataNav;
            console.log(props)
            if (dataNav && dataNav.length > 0) {
                dataNav.map((item, index) => {
                    if (item.keyID == props.match.params.keyID) {
                        this.setState({
                            selected: index
                        })
                    }
                })
            }
        }
        else {
            const data = await getMacroTypeByMacroKeyID(props.match.params.macroKeyID);
            const dataNav = data.data;
            if (data.errCode == 0 && data.data.length > 0) {
                this.setState({
                    dataNav: dataNav,
                    keySelected: dataNav[0].keyID,
                })
            }
            if (dataNav && dataNav.length > 0) {
                dataNav.map((item, index) => {
                    if (item.keyID == this.props.match.params.keyID) {
                        this.setState({
                            selected: index
                        })
                    }
                })
            }
        }

    }
    async componentDidMount() {
        const data = await getMacroTypeByMacroKeyID(this.props.match.params.macroKeyID);
        const dataNav = data.data;
        if (data.errCode == 0 && data.data.length > 0) {
            this.setState({
                dataNav: dataNav,
                keySelected: dataNav[0].keyID,
            })
        }
        if (dataNav && dataNav.length > 0) {
            dataNav.map((item, index) => {
                if (item.keyID == this.props.match.params.keyID) {
                    this.setState({
                        selected: index
                    })
                }
            })
        }
    }
    handleOnClickNav = async (item, index) => {

        await this.setState({
            selected: index,
            keySelected: item.keyID,
        })

    }
    render() {
        let arrDataNav = this.state.dataNav;
        //console.log(this.state)
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
                                                <Link className='active' to={"/vi-mo/" + this.props.match.params.macroKeyID + "/" + item.keyID} onClick={() => this.handleOnClickNav(item, index)}>{item.title}</Link>
                                            </li>
                                        );
                                    }
                                    else {

                                        return (
                                            <li>
                                                <Link to={"/vi-mo/" + this.props.match.params.macroKeyID + "/" + item.keyID} onClick={() => this.handleOnClickNav(item, index)}>{item.title}</Link>
                                            </li>
                                        );
                                    }
                                })

                            }
                        </ul>
                    </div>
                    <div className='table-data'>
                        <Route path={"/vi-mo/" + this.props.match.params.macroKeyID +"/:keyID"} component={TableDataMacro} />
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
