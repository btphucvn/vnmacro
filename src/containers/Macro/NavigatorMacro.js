import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './NavigatorMacro.scss'
import { getAllMacro } from "../../services/MacroService"
import { Link, withRouter } from 'react-router-dom';


const customStyles = {

};
class Macro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            macros: null,
            macro_key_id: null,
            macro_type_key_id: null
        }
    }


    async componentDidMount() {
        const macros = await getAllMacro();
        this.setState({
            macros: macros
        })
    }


    handleOnClickNav = (macro_key_id, macro_type_key_id) => {
        this.setState({
            macro_key_id: macro_key_id,
            macro_type_key_id: macro_type_key_id
        })
    }

    render() {
        const macros = this.state.macros;
        return (
            <div class="macro-header-tabs-container">
                <ul class="navigator-menu list-unstyled">
                    {macros &&
                        macros.map((macro) => {
                            return (
                                <li class="menu-group">
                                    <div class={"menu-group-name" + (this.state.macro_key_id == macro.key_id ? " active " : "")} >
                                        {macro.names.name_vi}
                                    </div>
                                    <ul class="menu-list list-unstyled">
                                        {
                                            macro.macro_types.map((macro_type) => {
                                                return (
                                                    <li class={"menu" + (this.state.macro_type_key_id == macro_type.key_id ? " active " : "")}>
                                                        <Link class="menu-link"
                                                            to={"/vi-mo/" + macro.key_id + "/" + macro_type.key_id}
                                                            onClick={() => this.handleOnClickNav(macro.key_id, macro_type.key_id)}>{macro_type.title}</Link>

                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </li>
                            );
                        })
                    }

                </ul>
            </div>
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
