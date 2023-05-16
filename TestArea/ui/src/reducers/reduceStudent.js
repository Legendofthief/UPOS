import { ACTION_TYPES } from "../variables";
const initialState = {
    list: []
}


export const reduceStudent = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_STUDENT:
            return {
                ...state,
                list: [...action.payload]
            }

        case ACTION_TYPES.CREATE_STUDENT:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case ACTION_TYPES.UPDATE_STUDENT:
            return {
                ...state,
                // eslint-disable-next-line
                list: state.list.map(x => x.id == action.payload.id ? action.payload : x)
            }

        case ACTION_TYPES.DELETE_STUDENT:
            return {
                ...state,
                // eslint-disable-next-line
                list: state.list.filter(x => x.id != action.payload)
            }
            
        default:
            return state
    }
}
