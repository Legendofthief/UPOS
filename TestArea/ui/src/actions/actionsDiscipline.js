import { ACTION_TYPES } from '../variables'
import dbactions from './dbactions'

const formateData = data => ({
    ...data
})

export const fetchAll = () => dispatch => {
    dbactions.Discipline().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_DISCIPLINE,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    dbactions.Discipline().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE_DISCIPLINE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    dbactions.Discipline().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_DISCIPLINE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    dbactions.Discipline().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE_DISCIPLINE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
