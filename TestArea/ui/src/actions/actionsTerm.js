import { ACTION_TYPES } from '../variables'
import dbactions from './dbactions'

const formateData = data => ({
    ...data
})

export const fetchAll = () => dispatch => {
    dbactions.Term().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_TERM,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    dbactions.Term().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE_TERM,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    dbactions.Term().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_TERM,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    dbactions.Term().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE_TERM,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
