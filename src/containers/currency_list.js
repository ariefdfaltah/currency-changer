import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import shortid from 'shortid';
import accounting from 'accounting';
import _ from 'lodash';
import './currency_list.css';

class CurrencyList extends Component {

    renderHead(data) {
        return (
            <th key={data}>
                {data}
            </th>
        )
    }

    renderCurrency(curData) {
        function renderCol(data) {
            return (
                <td key={shortid.generate()}>
                    {data}
                </td>
            )
        }
        return (
            <tr key={shortid.generate()}>
                {curData.map(renderCol)}
            </tr>
        )
    }

    render() {
        const { currency } = this.props;
        if(currency.length === 5) {
            currency.reverse();
            currency.map((item) => {
                item.id = currency.indexOf(item);
                item.date = moment.unix(item.timestamp).utc().format("LL");
                return item
            });
            const curArr = currency.map(function (item) {
                return Object.keys(item.rates)
            });
            const merged = [].concat.apply([], curArr);
            const uniq = _.uniq(merged);

            this.head = ['#'];
            currency.forEach((item) => {
                this.head.push(item.date)
            });

            this.fixCur = uniq.map((item) => {
                const data = [item];
                currency.forEach((cur) => {
                    if(cur.ratesqty[item]){
                        data.push(accounting.formatNumber(cur.ratesqty[item], 2, ','))
                    } else {
                        data.push('-')
                    }
                });
                return data
            });

            return (
                <table className="table table-hover">
                    <thead>
                    <tr>
                        {this.head.map(this.renderHead)}
                    </tr>
                    </thead>
                    <tbody>
                    {this.fixCur.map(this.renderCurrency)}
                    </tbody>
                </table>
            )

        }

        return (
            <div>

            </div>
        )
    }
}

function mapStateToProps({ currency }) {
    return { currency };
}

export default connect(mapStateToProps)(CurrencyList);
