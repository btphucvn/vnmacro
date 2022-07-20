import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './TableDataMacro.scss'
import { getAllQuantities } from '../../services/QuantitiesService'
import { Link, withRouter } from 'react-router-dom';

const ref = React.createRef();

class TableDataMacro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyID: "",
            idMacro: -1,
        }

    }
    componentWillReceiveProps(props) {
        //console.log(this.props)

        this.setState({
            keyID: props.match.params.keyID,
            idMacro: props.idMacro
        })
    }
    componentDidMount() {
        this.setState({
            keyID: this.props.match.params.keyID,
        })
    }
    toggle = (e,eIDs) => {
        console.log(e.currentTarget.id);
        console.log(eIDs)
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
    render() {
        return (
            <Fragment>
                <table class="cell">
                    <caption>Books I May or May Not Have Read</caption>
                    <thead>
                        <tr>
                            <th><span class="visually-hidden">Toggle</span></th>
                            <th>Author</th>
                            <th>Title</th>
                            <th>Year</th>
                            <th>ISBN-13</th>
                            <th>ISBN-10</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Miguel De Cervantes</td>
                            <td>The Ingenious Gentleman Don Quixote of La Mancha</td>
                            <td>1605</td>
                            <td>9783125798502</td>
                            <td>3125798507</td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button" id="btnMSb" aria-expanded="false" onClick={() => this.toggle(this.id, '#MS01b,#MS02b,#MS03b')} aria-controls="MS01b MS02b MS03b" aria-label="3 more from" aria-labelledby="btnMSb lblMSb">
                                    <svg xmlns="\http://www.w3.org/2000/svg&quot;" viewBox="0 0 80 80" focusable="false"><path d="M70.3 13.8L40 66.3 9.7 13.8z"></path></svg>
                                </button>
                            </td>
                            <td id="lblMSb">Mary Shelley</td>
                            <td>Frankenstein; or, The Modern Prometheus</td>
                            <td>1818</td>
                            <td>9781530278442</td>
                            <td>1530278449</td>
                        </tr>
                        <tr id="MS01b" class="hidden">
                            <td></td>
                            <td>Mary Shelley</td>
                            <td>Valperga: Or, the Life and Adventures of Castruccio, Prince of Lucca</td>
                            <td>1823</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr id="MS02b" class="hidden">
                            <td></td>
                            <td>Mary Shelley</td>
                            <td>The Last Man</td>
                            <td>1826</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr id="MS03b" class="hidden">
                            <td></td>
                            <td>Mary Shelley</td>
                            <td>The Fortunes of Perkin Warbeck, A Romance</td>
                            <td>1830</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Herman Melville</td>
                            <td>Moby-Dick; or, The Whale</td>
                            <td>1851</td>
                            <td>9781530697908</td>
                            <td>1530697905</td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button" id="btnEDENSb" aria-expanded="false" onClick={(event,eIDs)=>this.toggle(event,'#EDENS01b,#EDENS02b,#EDENS03b,#EDENS04b,#EDENS05b')}
                                    aria-controls="EDENS01b EDENS02b EDENS03b EDENS04b EDENS05b" aria-label="5 more from" aria-labelledby="btnEDENSb lblEDENSb">
                                    <svg xmlns="\http://www.w3.org/2000/svg&quot;" viewBox="0 0 80 80" focusable="false"><path d="M70.3 13.8L40 66.3 9.7 13.8z"></path></svg>
                                </button>
                            </td>
                            <td id="lblEDENSb">Emma Dorothy Eliza Nevitte Southworth</td>
                            <td>The Hidden Hand</td>
                            <td>1888</td>
                            <td>9780813512969</td>
                            <td>0813512964</td>
                        </tr>
                        <tr id="EDENS01b" class="hidden">
                            <td></td>
                            <td>Emma Dorothy </td>
                            <td>A Leap in the Dark: A Novel</td>
                            <td>1889</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr id="EDENS02b" class="hidden">
                            <td></td>
                            <td>Emma Dorothy Eliza </td>
                            <td>Unknown; or the Mystery of Raven Rocks</td>
                            <td>1889</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr id="EDENS03b" class="hidden">
                            <td></td>
                            <td>Emma Dorothy Eliza Nevitte </td>
                            <td>The Lost Lady of Lone</td>
                            <td>1890</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr id="EDENS04b" class="hidden">
                            <td></td>
                            <td>Emma Dorothy Eliza Nevitte Southworth</td>
                            <td>The Rejected Bride</td>
                            <td>1894</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr id="EDENS05b" class="hidden">
                            <td></td>
                            <td>Emma Dorothy Eliza Nevitte Southworth</td>
                            <td>Gertrude Haddon</td>
                            <td>1894</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>F. Scott Fitzgerald</td>
                            <td>The Great Gatsby</td>
                            <td>1925</td>
                            <td>9780743273565</td>
                            <td>0743273567</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>George Orwell</td>
                            <td>Nineteen Eighty-Four</td>
                            <td>1948</td>
                            <td>9780451524935</td>
                            <td>0451524934</td>
                        </tr>
                    </tbody>
                </table>



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
