import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './TableDataMacro.scss'
import { getAllQuantities } from '../../services/QuantitiesService'
import { Link, withRouter } from 'react-router-dom';
import { Hidden } from '@material-ui/core';
import { getValueTypeByKeyIDMactoType } from '../../services/MacroTypeService'
import { getTableByKeyIDMactoType } from '../../services/TableService'
import { CommonUtils } from '../../utils';



class TableDataMacro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key_id: "",
            value_types: null,
            idMacro: -1,
            selectedRadio: "Value",
            dataTable: null,
        }

    }

    checkExitsValueType(value_types, valueType) {
        for (let item of value_types) {
            if (item == valueType) {
                return true;
            }
        }
        return false
    }

    async componentWillReceiveProps(props) {

        let value_types = await getValueTypeByKeyIDMactoType(props.match.params.key_id);

        let selectedRadio = this.state.selectedRadio;
        if (value_types.data != undefined && !this.checkExitsValueType(value_types.data, selectedRadio)) {
            selectedRadio = value_types.data[0];
        }
        const dataTable = await getTableByKeyIDMactoType(props.match.params.key_id, selectedRadio);

        this.setState({
            key_id: props.match.params.key_id,
            idMacro: props.idMacro,
            value_types: value_types,
            dataTable: dataTable,
            selectedRadio: selectedRadio
        })
    }
    async componentDidMount() {
        // console.log(this.props)
        let value_types = await getValueTypeByKeyIDMactoType(this.props.match.params.key_id);
        const dataTable = await getTableByKeyIDMactoType(this.props.match.params.key_id, this.state.selectedRadio);
        this.setState({
            key_id: this.props.match.params.key_id,
            value_types: value_types,
            dataTable: dataTable
        })
    }
    toggle = (e, eIDs) => {
        for (let i = 0; i < eIDs.length; i++) {
            if (!eIDs[i].includes("#")) {
                eIDs[i] = "#" + eIDs[i];
            }

        }
        eIDs = eIDs.toString()
        const btnID = e.currentTarget.id;
        //Feed the list of ids as a selector
        var theRows = document.querySelectorAll(eIDs);
        // Get the button that triggered this
        var theButton = document.getElementById(btnID);
        // If the button is not expanded...
        if (theButton.getAttribute("aria-expanded") == "false") {
            // Loop through the rows and show them
            for (var i = 0; i < theRows.length; i++) {
                theRows[i].classList.add("shown");
                theRows[i].classList.remove("hidden");
            }
            // Now set the button to expanded
            theButton.setAttribute("aria-expanded", "true");
            // Otherwise button is not expanded...
        } else {
            // Loop through the rows and hide them
            for (var i = 0; i < theRows.length; i++) {
                theRows[i].classList.add("hidden");
                theRows[i].classList.remove("shown");
            }
            // Now set the button to collapsed
            theButton.setAttribute("aria-expanded", "false");
        }
    }
    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    handleRadioChange = async (event) => {
        const dataTable = await getTableByKeyIDMactoType(this.props.match.params.key_id, event.target.value);
        this.setState({
            selectedRadio: event.target.value,
            dataTable: dataTable
        });
    }
    handleSearch = () => {

        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("txtSearch");
        filter = input.value.toUpperCase();
        table = document.getElementById("cpi");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    handleOnClickRow = (rowClick) => {
        //rowClick.data = rowClick.data.reverse();
        this.props.updateDataChartFromTableClick(rowClick);
    }
    render() {
        const collapseFlag = false;
        let classHidden = "";
        const value_types = this.state.value_types;
        const dataTable = this.state.dataTable;
        // console.log(this.state.dataTable);
        if (collapseFlag) { classHidden = "hidden" }
        return (
            <Fragment>
                <div className="radio-container">
                    {
                        value_types != null && value_types.data.length > 0 ? value_types.data.map((valueType, valueTypeIndex) => {
                            return (
                                <label>
                                    <input type="radio" value={valueType}
                                        checked={this.state.selectedRadio === valueType}
                                        onChange={this.handleRadioChange} />
                                    <span>{valueType}</span>
                                </label>
                            );
                        }
                        ) : null
                    }

                    <input type="text" id="txtSearch" onChange={this.handleSearch} placeholder="Tìm chỉ số" title="Type in a name"></input>
                </div>

                {dataTable ?
                    dataTable.map((dataTable, dataTableIndex) => {
                        let headerTable = dataTable.header;
                        return (
                            <table className="cell" id={dataTable.key_id}>
                                <thead>
                                    <tr>
                                        {/* {collapseFlag ? <th><span className="visually-hidden">Toggle</span></th> : ""

                                        } */}
                                        <th className='header-title-table'>{dataTable.names.name_vi}</th>
                                        {

                                            headerTable.map((headerTable, headerTableIndex) => {

                                                return (<th className='header-table'>{headerTable}</th>);

                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        dataTable.rows.map((rowLevel1, indexRow) => {
                                            let rowClick = {}
                                            rowClick.id = rowLevel1.idChild;
                                            rowClick.name = dataTable.names.name_vi + " - " + rowLevel1.names.name_vi;
                                            rowClick.data = rowLevel1.data;
                                            return (
                                                <Fragment>
                                                    {

                                                        rowLevel1.key_id == 'all' ? "" :
                                                            <tr className="bold-general" onClick={() => this.handleOnClickRow(rowClick)}>
                                                                {/* {collapseFlag ?
                                                                    <Fragment>
                                                                        <td className='td-toggle'>
                                                                            <button type="button"
                                                                                id={rowLevel1.idChild}
                                                                                aria-expanded="false"
                                                                                onClick={(event, eIDs) => this.toggle(event, rowLevel1.childRow)}
                                                                            >
                                                                                <svg xmlns="\http://www.w3.org/2000/svg&quot;" viewBox="0 0 80 80" focusable="false"><path d="M70.3 13.8L40 66.3 9.7 13.8z"></path></svg>
                                                                            </button>

                                                                        </td>
                                                                    </Fragment>
                                                                    : ""
                                                                } */}
                                                                <td className="td-column-title">

                                                                    <div>
                                                                        {collapseFlag ?
                                                                            <button type="button"
                                                                                id={rowLevel1.idChild}
                                                                                aria-expanded="false"
                                                                                onClick={(event, eIDs) => this.toggle(event, rowLevel1.childRow)}
                                                                            >
                                                                                <svg xmlns="\http://www.w3.org/2000/svg&quot;" viewBox="0 0 80 80" focusable="false"><path d="M70.3 13.8L40 66.3 9.7 13.8z"></path></svg>
                                                                            </button>
                                                                            : ""
                                                                        }
                                                                        {rowLevel1.names.name_vi}
                                                                    </div>
                                                                </td>
                                                                {
                                                                    rowLevel1.data.map((data, indexData) => {
                                                                        return (
                                                                            <td className="td-column-value">
                                                                                {parseFloat(rowLevel1.data[indexData][1]).toFixed(2) >= 1000 ?
                                                                                    CommonUtils.numberWithCommas(parseFloat(rowLevel1.data[indexData][1]).toFixed(0))
                                                                                    : parseFloat(rowLevel1.data[indexData][1]).toFixed(2)
                                                                                }
                                                                            </td>
                                                                        );

                                                                    })
                                                                }
                                                            </tr>
                                                    }
                                                    {
                                                        rowLevel1.rows.map((rowLevel2, indexRow) => {
                                                            let rowClick = {}
                                                            rowClick.id = rowLevel2.idChild;
                                                            rowClick.name = dataTable.names.name_vi + " - " + rowLevel2.names.name_vi;
                                                            rowClick.data = rowLevel2.data;
                                                            if (rowLevel1.key_id == "all") { classHidden = ""; }
                                                            return (
                                                                <Fragment>

                                                                    <tr id={rowLevel2.idChild} className={classHidden} onClick={() => this.handleOnClickRow(rowClick)}>
                                                                        {/* {collapseFlag ? <td className='td-toggle'></td> : ""} */}
                                                                        <td className="td-column-title">
                                                                            {rowLevel2.names.name_vi}
                                                                        </td>
                                                                        {
                                                                            rowLevel2.data.map((data, indexData) => {
                                                                                return (
                                                                                    <td className="td-column-value">
                                                                                        {parseFloat(rowLevel2.data[indexData][1]).toFixed(2) >= 1000 ?
                                                                                            CommonUtils.numberWithCommas(parseFloat(rowLevel2.data[indexData][1]).toFixed(0))
                                                                                            : parseFloat(rowLevel2.data[indexData][1]).toFixed(2)
                                                                                        }
                                                                                    </td>
                                                                                );
                                                                            })
                                                                        }
                                                                    </tr>
                                                                    {
                                                                        rowLevel2.rows.map((rowLevel3, indexRow) => {
                                                                            let rowClick = {}
                                                                            rowClick.id = rowLevel3.idChild;
                                                                            rowClick.name = dataTable.names.name_vi + " - " + rowLevel3.names.name_vi;
                                                                            rowClick.data = rowLevel3.data;
                                                                            return (
                                                                                <tr id={rowLevel3.idChild} className={classHidden} onClick={() => this.handleOnClickRow(rowClick)}>
                                                                                    {/* {collapseFlag ? <td className='td-toggle'></td> : ""} */}
                                                                                    <td className="td-column-title padding-child-row">
                                                                                        {rowLevel3.names.name_vi}
                                                                                    </td>
                                                                                    {
                                                                                        rowLevel3.data.map((data, indexData) => {
                                                                                            return (
                                                                                                <td className="td-column-value">
                                                                                                    {parseFloat(rowLevel3.data[indexData][1]).toFixed(2) >= 1000 ?
                                                                                                        CommonUtils.numberWithCommas(parseFloat(rowLevel3.data[indexData][1]).toFixed(0))
                                                                                                        : parseFloat(rowLevel3.data[indexData][1]).toFixed(2)
                                                                                                    }
                                                                                                </td>
                                                                                            );
                                                                                        })
                                                                                    }
                                                                                </tr>
                                                                            );
                                                                        })
                                                                    }
                                                                </Fragment>
                                                            );

                                                        })
                                                    }
                                                </Fragment>
                                            );
                                        })
                                    }

                                </tbody>
                            </table>
                        );

                    }) : ""
                }




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

export default connect(mapStateToProps, mapDispatchToProps)(TableDataMacro);
