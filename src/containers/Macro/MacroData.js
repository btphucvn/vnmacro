import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { getMacroTypeByKeyIDMacro } from '../../services/MacroTypeService'


class MacroData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataNav: null,
            selected: -1,
            keySelected: "",
            key_id: "",
            idMacro: -1,
        }

    }
    async componentWillReceiveProps(props) {
        if (props.match.params.key_id_macro == this.props.match.params.key_id_macro) {
            const dataNav = this.state.dataNav;
            //console.log(props)
            if (dataNav && dataNav.length > 0) {
                dataNav.map((item, index) => {
                    if (item.key_id == props.match.params.key_id) {
                        this.setState({
                            selected: index
                        })
                    }
                })
            }
        }
        else {
            const data = await getMacroTypeByKeyIDMacro(props.match.params.key_id_macro);
            const dataNav = data.data;
            if (data.errCode == 0 && data.data.length > 0) {
                this.setState({
                    dataNav: dataNav,
                    keySelected: dataNav[0].key_id,
                })
            }
            if (dataNav && dataNav.length > 0) {
                dataNav.map((item, index) => {
                    if (item.key_id == this.props.match.params.key_id) {
                        this.setState({
                            selected: index,
                            idMacro:item.id,

                        })
                    }
                })
            }
        }

    }
    async componentDidMount() {
        const data = await getMacroTypeByKeyIDMacro(this.props.match.params.key_id_macro);
        //console.log(data);

        const dataNav = data.data;
        if (data.errCode == 0 && data.data.length > 0) {
            this.setState({
                dataNav: dataNav,
                keySelected: dataNav[0].key_id,
            })
        }
        if (dataNav && dataNav.length > 0) {
            dataNav.map((item, index) => {
                if (item.key_id == this.props.match.params.key_id) {
                    this.setState({
                        selected: index,
                        idMacro:item.id,

                    })
                }
            })
        }
    }
    handleOnClickNav = async (item, index) => {
        //console.log(item);
        await this.setState({
            selected: index,
            keySelected: item.keyID,
            idMacro: item.id,
        })

    }
    render() {
        let arrDataNav = this.state.dataNav;
        //console.log(this.state)
        return (
            <Fragment>
                    <div className='title-container'>
                        <ul>
                            {
                                arrDataNav && arrDataNav.length > 0 && arrDataNav.map((item, index) => {
                                    if (index === this.state.selected) {

                                        return (
                                            <li>
                                                <Link className='active' to={"/vi-mo/" + this.props.match.params.key_id_macro + "/" + item.key_id} onClick={() => this.handleOnClickNav(item, index)}>{item.title}</Link>
                                            </li>
                                        );
                                    }
                                    else {

                                        return (
                                            <li>
                                                <Link to={"/vi-mo/" + this.props.match.params.key_id_macro + "/" + item.key_id} onClick={() => this.handleOnClickNav(item, index)}>{item.title}</Link>
                                            </li>
                                        );
                                    }
                                })

                            }
                        </ul>
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
