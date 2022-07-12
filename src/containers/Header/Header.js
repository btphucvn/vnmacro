import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";

import './Header.scss';
import { path } from '../../utils';

class Header extends Component {

    render() {
        const { processLogout } = this.props;

        return (
            // <div className="header-container">
            //     {/* thanh navigator */}
            //     {/* <div className="header-tabs-container">
            //         <Navigator menus={adminMenu} />

            //     </div> */}

            // </div>
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light navigator-bar-container">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">TỔNG QUAN</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={path.MACRO}>VĨ MÔ</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
