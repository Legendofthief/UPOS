import { ACTION_TYPES } from "../variables";
const initialState = {
    list: []
}


export const reduceTerm = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_TERM:
            return {
                ...state,
                list: [...action.payload]
            }

        case ACTION_TYPES.CREATE_TERM:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case ACTION_TYPES.UPDATE_TERM:
            return {
                ...state,
                // eslint-disable-next-line
                list: state.list.map(x => x.id == action.payload.id ? action.payload : x)
            }

        case ACTION_TYPES.DELETE_TERM:
            return {
                ...state,
                // eslint-disable-next-line
                list: state.list.filter(x => x.id != action.payload)
            }
            
        default:
            return state
    }
}
