import { ACTION_TYPES } from "../variables";
const initialState = {
    list: []
}


export const reduceDiscipline = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_DISCIPLINE:
            return {
                ...state,
                list: [...action.payload]
            }

        case ACTION_TYPES.CREATE_DISCIPLINE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case ACTION_TYPES.UPDATE_DISCIPLINE:
            return {
                ...state,
                // eslint-disable-next-line
                list: state.list.map(x => x.id == action.payload.id ? action.payload : x)
            }

        case ACTION_TYPES.DELETE_DISCIPLINE:
            return {
                ...state,
                // eslint-disable-next-line
                list: state.list.filter(x => x.id != action.payload)
            }
            
        default:
            return state
    }
}
