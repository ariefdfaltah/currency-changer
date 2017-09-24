import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCurrency, fetchNullCurrency } from '../actions/index'
import ArrayRange from 'array-range';

import './select_bar.css';

class SelectBar extends Component{
    constructor(props) {
        super(props);

        this.state = { term: 0 };

        this.onValueSelect = this.onValueSelect.bind(this);
    }

    onValueSelect(event) {
        this.setState({ term: event.target.value });
        this.onSubmit(event.target.value);

    }
    onSubmit(a){
        this.props.fetchNullCurrency();
        this.props.fetchCurrency(a);
    }
    render() {
        const dataArr = ArrayRange(1,1001);
        const MakeItem = function(X) {
            return (
                <option
                    key={X}
                    value={X}
                >
                    {X} USD
                </option>
            );
        };
        return (
            <form className="form-group">
                <select
                    onChange={this.onValueSelect}
                    className="form-control"
                    value={this.state.term}
                >
                    <option value="0">Choose Your Amount</option>
                    {dataArr.map(MakeItem)}
                </select>
            </form>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchCurrency, fetchNullCurrency }, dispatch)
}
export default connect(null, mapDispatchToProps)(SelectBar);