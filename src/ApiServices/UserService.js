import Api from './Api';

export default {
    GetUsers() {
        return Api().get(`users`)
    },
    AddUser(payload) {
        return Api().post(`users`, payload)
    }
}