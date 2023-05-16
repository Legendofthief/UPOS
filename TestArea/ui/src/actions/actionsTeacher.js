import { ACTION_TYPES } from '../variables'
import dbactions from './dbactions'

const formateData = data => ({
    ...data
})

export const fetchAll = () => dispatch => {
    dbactions.Teacher().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_TEACHER,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    dbactions.Teacher().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE_TEACHER,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => alert(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    dbactions.Teacher().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_TEACHER,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    dbactions.Teacher().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE_TEACHER,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
