import { FETCH_CURRENCY1, FETCH_CURRENCY2, FETCH_CURRENCY3, FETCH_CURRENCY4, FETCH_CURRENCY5, FETCH_NULL_CURRENCY } from '../actions/index';

export default function (state =  [], action) {
    switch (action.type){
        case FETCH_CURRENCY1:
            return state.concat(action.payload);
        case FETCH_CURRENCY2:
            return state.concat(action.payload);
        case FETCH_CURRENCY3:
            return state.concat(action.payload);
        case FETCH_CURRENCY4:
            return state.concat(action.payload);
        case FETCH_CURRENCY5:
            return state.concat(action.payload);
        case FETCH_NULL_CURRENCY:
            return state = [];
        default:
            state = []
    }
    return state;
}