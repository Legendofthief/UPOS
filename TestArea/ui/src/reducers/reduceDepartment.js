import { ACTION_TYPES } from "../variables";
const initialState = {
    list: []
}


export const reduceDepartment = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_DEPARTMENT:
            return {
                ...state,
                list: [...action.payload]
            }

        case ACTION_TYPES.CREATE_DEPARTMENT:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case ACTION_TYPES.UPDATE_DEPARTMENT:
            return {
                ...state,
                // eslint-disable-next-line
                list: state.list.map(x => x.id == action.payload.id ? action.payload : x)
            }

        case ACTION_TYPES.DELETE_DEPARTMENT:
            return {
                ...state,
                // eslint-disable-next-line
                list: state.list.filter(x => x.id != action.payload)
            }
            
        default:
            return state
    }
}
