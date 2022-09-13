import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './TableDataMacro.scss'
import { getAllQuantities } from '../../services/QuantitiesService'
import { Link, withRouter } from 'react-router-dom';
import { Hidden } from '@material-ui/core';
import { getValueTypeByKeyIDMactoType } from '../../services/MacroTypeService'
import { getTableByKeyIDMactoType } from '../../services/TableService'
import { CommonUtils } from '../../utils';
import Loader from '../../components/Loader/Loader';
import { getMacroData } from '../../services/MacroDataService';
import 'bootstrap/dist/css/bootstrap.min.css';


class TableDataMacro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key_id: "",
            value_types: null,
            idMacro: -1,
            selectedRadio: "Value",
            dataTable: null,
            dataChart: null,
        }

    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
        // console.log(props.match.params.key_id," ",this.props.match.params.key_id);
        if (props.match.params.key_id !== this.props.match.params.key_id) {

            this.setState({
                dataTable: null
            })

            let value_types = await getValueTypeByKeyIDMactoType(props.match.params.key_id);

            let selectedRadio = this.state.selectedRadio;
            if (value_types.data != undefined && !this.checkExitsValueType(value_types.data, selectedRadio)) {
                selectedRadio = value_types.data[0];
            }
            //const dataTable = await getMacroData(props.match.params.key_id, selectedRadio);
            const dataTable = await getTableByKeyIDMactoType(props.match.params.key_id, selectedRadio);

            this.setState({
                key_id: props.match.params.key_id,
                idMacro: props.idMacro,
                value_types: value_types,
                dataTable: dataTable,
                selectedRadio: selectedRadio,
                dataChart: JSON.parse(props.dataChart)
            })
        }

        if (JSON.stringify(this.state.dataChart) !== props.dataChart) {
            this.setState({
                dataChart: JSON.parse(props.dataChart)
            })
        }
    }

    async componentDidMount() {
        // console.log(this.props)
        this.setState({
            dataTable: null
        })
        let value_types = await getValueTypeByKeyIDMactoType(this.props.match.params.key_id);

        let selectedRadio = this.state.selectedRadio;
        if (value_types.data != undefined && !this.checkExitsValueType(value_types.data, selectedRadio)) {
            selectedRadio = value_types.data[0];
        }
        //const dataTable = await getMacroData(this.props.match.params.key_id, selectedRadio);
        const dataTable = await getTableByKeyIDMactoType(this.props.match.params.key_id, selectedRadio);

        this.setState({
            key_id: this.props.match.params.key_id,
            idMacro: this.props.idMacro,
            value_types: value_types,
            dataTable: dataTable,
            selectedRadio: selectedRadio,
            dataChart: JSON.parse(this.props.dataChart)

        })
    }
    toggle = (e, eIDs) => {
        e.stopPropagation();
        for (let i = 0; i < eIDs.length; i++) {
            if (!eIDs[i].includes("#")) {
                eIDs[i] = "#" + eIDs[i];
            }

        }
        eIDs = eIDs.toString()
        const btnID = e.currentTarget.id;
        console.log(e.currentTarget.id);
        //Feed the list of ids as a selector
        var theRows = document.querySelectorAll(eIDs);
        // Get the button that triggered this
        var theButton = document.getElementById(btnID);
        console.log(theButton.getAttribute("aria-expanded"))
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
        // const dataTable = await getMacroData(this.props.match.params.key_id, event.target.value);
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
        console.log(rowClick)
        this.props.updateDataChartFromTableClick(rowClick);
    }
    checkCollapse = () => {
        const collapseKey = ["xuat-khau-quoc-gia-mat-hang", "nhap-khau-quoc-gia-mat-hang", "chi-so-iip-viet-nam", "fdi-dang-ky-theo-quoc-gia", "fdi-dang-ky-theo-tinh-thanh"]
        let result = false;
        collapseKey.map((item) => {
            if (item == this.state.key_id) {
                result = true;
            }
        })
        return result;
    }
    checkRowSelected = (idChild) => {
        const dataChart = this.state.dataChart;
        if (!dataChart) {
            return false;
        }
        for (let i = 0; i < dataChart.length; i++) {
            if (dataChart[i].id === idChild) {
                return true;
            }
        }
        return false;
    }
    getYearFromStringHeader = (str) => {
        const arrStr = str.split('-');
        return arrStr[1];
    }
    render() {
        const collapseFlag = this.checkCollapse();
        //const collapseFlag = false;
        let classHidden = "";
        const value_types = this.state.value_types;
        const dataTable = this.state.dataTable;
        // console.log(this.state.dataTable);

        if (!dataTable) {
            return (
                <Fragment>
                    <Loader />
                </Fragment>
            );
        }

        if (collapseFlag && dataTable) {
            classHidden = "hidden";
            dataTable.map((table, dataTableIndex) => {
                let childRows = [];
                for (let i = table.rows.length - 1; i >= 0; i--) {

                    if (table.rows[i].level == 3) {
                        childRows.push(table.rows[i].key_id)
                    }
                    if (table.rows[i].level == 2) {
                        table.rows[i].childRows = childRows;
                        childRows = [];
                    }

                }
            });
            // console.log(dataTable);
        }

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
                        let tableName = "";
                        tableName = dataTable.name;
                        if (dataTable.table_type != "") {
                            tableName = tableName + " " + "(" + dataTable.table_type + ")";
                        }
                        if (dataTable.unit != "") {
                            tableName = tableName + " " + "(" + dataTable.unit + ")";
                        }
                        return (
                            <table className="cell" id={dataTable.key_id}>
                                <thead>
                                    <tr>
                                        <th className='header-title-table'>{tableName.toUpperCase()}</th>
                                        {

                                            headerTable.map((headerTable, headerTableIndex) => {
                                                if (dataTable.date_type === "Year") {
                                                    return <th className='header-table'>{this.getYearFromStringHeader(headerTable)}</th>;
                                                }
                                                else {
                                                    return <th className='header-table'>{headerTable}</th>;
                                                }
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataTable.rows.map((row, indexRow) => {
                                            let rowClick = {};
                                            rowClick.id = row.key_id;
                                            rowClick.name = dataTable.name.toUpperCase() + " - " + this.capitalizeFirstLetter(row.name) + " (" + row.unit + ")";

                                            rowClick.data = row.data;
                                            rowClick.yaxis = row.yaxis;
                                            if (row.level == 1) {
                                                return (
                                                    <tr
                                                        onClick={() => this.handleOnClickRow(rowClick)}
                                                        className={(this.checkRowSelected(row.key_id) ? "high-light-row" : "")}
                                                    >
                                                        <td className={"td-column-title bold-general"}>
                                                            {
                                                                dataTable.unit == ""
                                                                    ?
                                                                    <span>
                                                                        {this.capitalizeFirstLetter(row.name) + " (" + row.unit + ")"}
                                                                    </span>
                                                                    :
                                                                    <span>
                                                                        {this.capitalizeFirstLetter(row.name)}
                                                                    </span>
                                                            }

                                                        </td>
                                                        {
                                                            row.data.map((data, indexData) => {
                                                                return (
                                                                    <td className="td-column-value bold-general">
                                                                        {
                                                                            row.data[indexData][1] != null ?
                                                                                (parseFloat(row.data[indexData][1]).toFixed(2) >= 1000 ?
                                                                                    CommonUtils.numberWithCommas(parseFloat(row.data[indexData][1]).toFixed(0))
                                                                                    : parseFloat(row.data[indexData][1]).toFixed(2))
                                                                                : "-"
                                                                        }
                                                                    </td>
                                                                );

                                                            })
                                                        }
                                                    </tr>
                                                )
                                            }
                                            if (row.level == 2 || row.level == 0) {
                                                return (
                                                    <tr id={row.key_id}
                                                        onClick={() => this.handleOnClickRow(rowClick)}
                                                        className={(this.checkRowSelected(row.key_id) ? "high-light-row" : "")}
                                                    >
                                                        <td className={"td-column-title"}>
                                                            {collapseFlag && row.childRows && row.childRows.length > 0 ?
                                                                <Fragment>
                                                                    <button type="button"
                                                                        id={"btn_" + row.key_id}
                                                                        aria-expanded="false"
                                                                        onClick={(event, eIDs) => this.toggle(event, row.childRows)}
                                                                    >
                                                                        <svg
                                                                            xmlns="\http://www.w3.org/2000/svg&quot;" viewBox="0 0 80 80" focusable="false"><path d="M70.3 13.8L40 66.3 9.7 13.8z"></path></svg>
                                                                    </button>

                                                                </Fragment>
                                                                : ""


                                                            }
                                                            {/* <span class="col-name-padding">{this.capitalizeFirstLetter(row.name)}</span> */}
                                                            {
                                                                dataTable.unit == ""
                                                                    ?
                                                                    <span>
                                                                        {this.capitalizeFirstLetter(row.name) + " (" + row.unit + ")"}
                                                                    </span>
                                                                    :
                                                                    <span>
                                                                        {this.capitalizeFirstLetter(row.name)}
                                                                    </span>
                                                            }
                                                        </td>
                                                        {
                                                            row.data.map((data, indexData) => {
                                                                return (
                                                                    <td className="td-column-value">
                                                                        {
                                                                            row.data[indexData][1] != null ?
                                                                                (parseFloat(row.data[indexData][1]).toFixed(2) >= 1000 ?
                                                                                    CommonUtils.numberWithCommas(parseFloat(row.data[indexData][1]).toFixed(0))
                                                                                    : parseFloat(row.data[indexData][1]).toFixed(2))
                                                                                : "-"
                                                                        }
                                                                    </td>
                                                                );

                                                            })
                                                        }
                                                    </tr>
                                                )
                                            }
                                            if (row.level == 3) {
                                                return (
                                                    <tr id={row.key_id}
                                                        onClick={() => this.handleOnClickRow(rowClick)}
                                                        className={(this.checkRowSelected(row.key_id) ? "shown high-light-row" : classHidden)}
                                                    >
                                                        <td className="td-column-title padding-child-row">
                                                            {
                                                                dataTable.unit == ""
                                                                    ?
                                                                    <span>
                                                                        {this.capitalizeFirstLetter(row.name) + " (" + row.unit + ")"}
                                                                    </span>
                                                                    :
                                                                    <span>
                                                                        {this.capitalizeFirstLetter(row.name)}
                                                                    </span>
                                                            }
                                                        </td>
                                                        {
                                                            row.data.map((data, indexData) => {
                                                                return (
                                                                    <td className="td-column-value">
                                                                        {
                                                                            row.data[indexData][1] != null ?
                                                                                (parseFloat(row.data[indexData][1]).toFixed(2) >= 1000 ?
                                                                                    CommonUtils.numberWithCommas(parseFloat(row.data[indexData][1]).toFixed(0))
                                                                                    : parseFloat(row.data[indexData][1]).toFixed(2))
                                                                                : "-"
                                                                        }
                                                                    </td>
                                                                );

                                                            })
                                                        }
                                                    </tr>
                                                )
                                            }
                                        })
                                    }
                                </tbody>
                            </table>
                        );
                    })
                    : ""
                }

                {/* {dataTable ?
                    dataTable.map((dataTable, dataTableIndex) => {
                        let headerTable = dataTable.header;
                        return (
                            <table className="cell" id={dataTable.key_id}>
                                <thead>
                                    <tr>
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
                                            rowClick.yaxis = rowLevel1.yaxis;
                                            return (
                                                <Fragment>
                                                    {

                                                        rowLevel1.key_id == 'all' ? "" :
                                                            <tr className={"bold-general " + (this.checkRowSelected(rowLevel1.idChild) ? "high-light-row" : "")}
                                                                onClick={() => this.handleOnClickRow(rowClick)}>

                                                                <td className="td-column-title">
                                                                    <div>
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
                                                            rowClick.yaxis = rowLevel2.yaxis;
                                                            if (rowLevel1.key_id == "all") { classHidden = ""; }
                                                            return (
                                                                <Fragment>

                                                                    <tr id={rowLevel2.idChild}
                                                                        className={(this.checkRowSelected(rowLevel2.idChild) ? "high-light-row" : "")}
                                                                        aria-expanded="false"
                                                                        onClick={() => this.handleOnClickRow(rowClick)}>
                                                                        <td className="td-column-title">
                                                                            {collapseFlag && rowLevel2.childRow.length > 0 ?
                                                                                <button type="button"
                                                                                    id={"btn_" + rowLevel2.idChild}
                                                                                    aria-expanded="false"
                                                                                    onClick={(event, eIDs) => this.toggle(event, rowLevel2.childRow)}
                                                                                >
                                                                                    <svg
                                                                                        xmlns="\http://www.w3.org/2000/svg&quot;" viewBox="0 0 80 80" focusable="false"><path d="M70.3 13.8L40 66.3 9.7 13.8z"></path></svg>
                                                                                </button>
                                                                                : ""
                                                                            }
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
                                                                            rowClick.yaxis = rowLevel3.yaxis;

                                                                            return (
                                                                                <tr id={rowLevel3.idChild} 
                                                                                    onClick={() => this.handleOnClickRow(rowClick)}
                                                                                    className={classHidden+" "+(this.checkRowSelected(rowLevel3.idChild) ? "high-light-row" : "")}

                                                                                    >
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

export default connect(mapStateToProps, mapDispatchToProps)(TableDataMacro);
