import axios from 'axios';
import moment from 'moment';
import ArrayRange from 'array-range';
import _ from 'lodash';


const APP_ID = 'dce0f4dc45334772bd233f74275ed059';
const ROOT_URL = `https://openexchangerates.org/api/historical/`;

export const FETCH_CURRENCY1 = 'FETCH_CURRENCY1';
export const FETCH_CURRENCY2 = 'FETCH_CURRENCY2';
export const FETCH_CURRENCY3 = 'FETCH_CURRENCY3';
export const FETCH_CURRENCY4 = 'FETCH_CURRENCY4';
export const FETCH_CURRENCY5 = 'FETCH_CURRENCY5';
export const FETCH_NULL_CURRENCY = 'FETCH_NULL_CURRENCY';

export function fetchCurrency(qty) {
    const sixMonth = ArrayRange(1, 6);
    const lastSixMonth = sixMonth.map(function (item) {
        const a = new Date();
        return moment(a).subtract(item, 'months').endOf('month').format('YYYY-MM-DD');
    });

    const calQty = (rates, qty) => {
        return _.transform(rates, function (result, value, key) {
            result[key] = value * qty;
        }, {})
    };

    if (sessionStorage.getItem('DateList') === null) {
        sessionStorage.setItem('DateList', lastSixMonth);
        const urlRequestSixMonth = lastSixMonth.map(function (item) {
            let o = {};
            o.date = item;
            o.url = `${ROOT_URL}${item}.json?app_id=${APP_ID}`;
            return o
        });

        return (dispatch) => {
            axios.get(urlRequestSixMonth[0].url)
                .then(({data}) => {
                    sessionStorage.setItem('FC1', JSON.stringify(data));
                    const {rates} = data;
                    data.ratesqty = calQty(rates, qty);
                    dispatch({type: 'FETCH_CURRENCY1', payload: data})
                });
            axios.get(urlRequestSixMonth[1].url)
                .then(({data}) => {
                    sessionStorage.setItem('FC2', JSON.stringify(data));
                    const {rates} = data;
                    data.ratesqty = calQty(rates, qty);
                    dispatch({type: 'FETCH_CURRENCY2', payload: data})
                });
            axios.get(urlRequestSixMonth[2].url)
                .then(({data}) => {
                    sessionStorage.setItem('FC3', JSON.stringify(data));
                    const {rates} = data;
                    data.ratesqty = calQty(rates, qty);
                    dispatch({type: 'FETCH_CURRENCY3', payload: data})
                });
            axios.get(urlRequestSixMonth[3].url)
                .then(({data}) => {
                    sessionStorage.setItem('FC4', JSON.stringify(data));
                    const {rates} = data;
                    data.ratesqty = calQty(rates, qty);
                    dispatch({type: 'FETCH_CURRENCY4', payload: data})
                });
            axios.get(urlRequestSixMonth[4].url)
                .then(({data}) => {
                    sessionStorage.setItem('FC5', JSON.stringify(data));
                    const {rates} = data;
                    data.ratesqty = calQty(rates, qty);
                    dispatch({type: 'FETCH_CURRENCY5', payload: data})
                });
        }
    } else if (lastSixMonth.toString() !== sessionStorage.getItem('DateList')) {
        sessionStorage.setItem('DateList', lastSixMonth);
        const urlRequestSixMonth = lastSixMonth.map(function (item) {
            let o = {};
            o.date = item;
            o.url = `${ROOT_URL}${item}.json?app_id=${APP_ID}`;
            return o
        });

        return (dispatch) => {
            axios.get(urlRequestSixMonth[0].url)
                .then(({data}) => {
                    sessionStorage.setItem('FC1', JSON.stringify(data));
                    const {rates} = data;
                    data.ratesqty = calQty(rates, qty);
                    dispatch({type: 'FETCH_CURRENCY1', payload: data})
                });
            axios.get(urlRequestSixMonth[1].url)
                .then(({data}) => {
                    sessionStorage.setItem('FC2', JSON.stringify(data));
                    const {rates} = data;
                    data.ratesqty = calQty(rates, qty);
                    dispatch({type: 'FETCH_CURRENCY2', payload: data})
                });
            axios.get(urlRequestSixMonth[2].url)
                .then(({data}) => {
                    sessionStorage.setItem('FC3', JSON.stringify(data));
                    const {rates} = data;
                    data.ratesqty = calQty(rates, qty);
                    dispatch({type: 'FETCH_CURRENCY3', payload: data})
                });
            axios.get(urlRequestSixMonth[3].url)
                .then(({data}) => {
                    sessionStorage.setItem('FC4', JSON.stringify(data));
                    const {rates} = data;
                    data.ratesqty = calQty(rates, qty);
                    dispatch({type: 'FETCH_CURRENCY4', payload: data})
                });
            axios.get(urlRequestSixMonth[4].url)
                .then(({data}) => {
                    sessionStorage.setItem('FC5', JSON.stringify(data));
                    const {rates} = data;
                    data.ratesqty = calQty(rates, qty);
                    dispatch({type: 'FETCH_CURRENCY5', payload: data})
                });
        }
    } else if (lastSixMonth.toString() === sessionStorage.getItem('DateList')) {
        return (dispatch) => {
            const FC1 = JSON.parse(sessionStorage.getItem('FC1'));
            FC1.ratesqty = calQty(FC1.rates, qty);
            dispatch({type: 'FETCH_CURRENCY1', payload: FC1});

            const FC2 = JSON.parse(sessionStorage.getItem('FC2'));
            FC2.ratesqty = calQty(FC2.rates, qty);
            dispatch({type: 'FETCH_CURRENCY2', payload: FC2});

            const FC3 = JSON.parse(sessionStorage.getItem('FC3'));
            FC3.ratesqty = calQty(FC3.rates, qty);
            dispatch({type: 'FETCH_CURRENCY3', payload: FC3});

            const FC4 = JSON.parse(sessionStorage.getItem('FC4'));
            FC4.ratesqty = calQty(FC4.rates, qty);
            dispatch({type: 'FETCH_CURRENCY4', payload: FC4});

            const FC5 = JSON.parse(sessionStorage.getItem('FC5'));
            FC5.ratesqty = calQty(FC5.rates, qty);
            dispatch({type: 'FETCH_CURRENCY5', payload: FC5});
        };

    }
}

export function fetchNullCurrency() {
    return({
        type: 'FETCH_NULL_CURRENCY'
    })
}