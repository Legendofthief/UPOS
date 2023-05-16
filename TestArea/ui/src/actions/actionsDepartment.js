import { ACTION_TYPES } from '../variables'
import dbactions from './dbactions'

const formateData = data => ({
    ...data
})

export const fetchAll = () => dispatch => {
    dbactions.Department().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_DEPARTMENT,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    dbactions.Department().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE_DEPARTMENT,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    dbactions.Department().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_DEPARTMENT,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    dbactions.Department().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE_DEPARTMENT,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
