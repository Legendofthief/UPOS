import { ACTION_TYPES } from '../variables'
import dbactions from './dbactions'

const formateData = data => ({
    ...data
})

export const fetchAll = () => dispatch => {
    dbactions.Group().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_GROUP,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    dbactions.Group().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE_GROUP,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    dbactions.Group().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE_GROUP,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    dbactions.Group().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE_GROUP,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
