import axios from 'axios'
import { variables } from '../variables'

const instance = axios.create({baseURL: variables.API_URL})

export default {
  Teacher(url = variables.API_URL + 'teacher') {
    return {
      fetchAll: () => instance.get(url),
      fetchById: id => instance.get(url + `/${id}`),
      create: newRecord => instance.post(url, newRecord),
      update: (id, updateRecord) => instance.put(url + `/${id}`, updateRecord),
      delete: id => instance.delete(url + `/${id}`)
    }
  },
  Group(url = variables.API_URL + 'group') {
    return {
      fetchAll: () => instance.get(url),
      fetchById: id => instance.get(url + `/${id}`),
      create: newRecord => instance.post(url, newRecord),
      update: (id, updateRecord) => instance.put(url + `/${id}`, updateRecord),
      delete: id => instance.delete(url + `/${id}`)
    }
  },
  Student(url = variables.API_URL + 'student') {
    return {
      fetchAll: () => instance.get(url),
      fetchById: id => instance.get(url + `/${id}`),
      create: newRecord => instance.post(url, newRecord),
      update: (id, updateRecord) => instance.put(url + `/${id}`, updateRecord),
      delete: id => instance.delete(url + `/${id}`)
    }
  },
  Discipline(url = variables.API_URL + 'discipline') {
    return {
      fetchAll: () => instance.get(url),
      fetchById: id => instance.get(url + `/${id}`),
      create: newRecord => instance.post(url, newRecord),
      update: (id, updateRecord) => instance.put(url + `/${id}`, updateRecord),
      delete: id => instance.delete(url + `/${id}`)
    }
  },
  Term(url = variables.API_URL + 'term') {
    return {
      fetchAll: () => instance.get(url),
      fetchById: id => instance.get(url + `/${id}`),
      create: newRecord => instance.post(url, newRecord),
      update: (id, updateRecord) => instance.put(url + `/${id}`, updateRecord),
      delete: id => instance.delete(url + `/${id}`)
    }
  },
  Grade(url = variables.API_URL + 'grade') {
    return {
      fetchAll: () => instance.get(url),
      fetchById: id => instance.get(url + `/${id}`),
      create: newRecord => instance.post(url, newRecord),
      update: (id, updateRecord) => instance.put(url + `/${id}`, updateRecord),
      delete: id => instance.delete(url + `/${id}`)
    }
  },
  Department(url = variables.API_URL + 'department') {
    return {
      fetchAll: () => instance.get(url),
      fetchById: id => instance.get(url + `/${id}`),
      create: newRecord => instance.post(url, newRecord),
      update: (id, updateRecord) => instance.put(url + `/${id}`, updateRecord),
      delete: id => instance.delete(url + `/${id}`)
    }
  },
  Faculty(url = variables.API_URL + 'faculty') {
    return {
      fetchAll: () => instance.get(url),
      fetchById: id => instance.get(url + `/${id}`),
      create: newRecord => instance.post(url, newRecord),
      update: (id, updateRecord) => instance.put(url + `/${id}`, updateRecord),
      delete: id => instance.delete(url + `/${id}`)
    }
  }
}
