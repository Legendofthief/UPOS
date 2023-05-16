import { ACTION_TYPES } from '../variables'
import dbactions from './dbactions'

const formateData = data => ({
    ...data
})

export const fetchAll = () => dispatch => {
    dbactions.Faculty().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_FACULTY,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    dbactions.Faculty().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE_FACULTY,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    dbactions.Faculty().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_FACULTY,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    dbactions.Faculty().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE_FACULTY,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
