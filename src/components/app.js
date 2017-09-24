import React, { Component } from 'react';
import SelectBar from '../containers/select_bar'
import CurrencyList from '../containers/currency_list'

export default class App extends Component {
    render() {
        return (
            <div>
                <SelectBar />
                <CurrencyList />
            </div>
        );
    }
}
