import { ACTION_TYPES } from '../variables'
import dbactions from './dbactions'

const formateData = data => ({
    ...data
})

export const fetchAll = () => dispatch => {
    dbactions.Student().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_STUDENT,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    dbactions.Student().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE_STUDENT,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    dbactions.Student().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_STUDENT,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    dbactions.Student().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE_STUDENT,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
