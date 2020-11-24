import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        status: '',
        token: localStorage.token || '',
        user_id: localStorage.user_id || '',
        user_name: localStorage.user_name || '',
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_reg(state) {
            state.status = 'success'
        },
        auth_success(state, data) {
            state.status = 'success'
            state.token = data.accessToken
            state.user_id = data.id.toString()
            state.user_name = data.username.toString()
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
            state.user_id = ''
            state.user_name = ''
        },
        user_update(state, user_name) {
            state.user_name = user_name.toString()
        }
    },
    actions: {
        login({
            commit
        }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({
                        url: 'http://localhost:8080/api/auth/signin',
                        data: user,
                        method: 'POST'
                    })
                    .then(resp => {
                        const token = resp.data.accessToken
                        const data = resp.data
                        localStorage.token = token
                        localStorage.user_id = data.id
                        localStorage.user_name = data.username
                        axios.defaults.headers.common['x-access-token'] = token
                        commit('auth_success', data)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        localStorage.removeItem('user_id')
                        localStorage.removeItem('user_name')
                        reject(err)
                    })
            })
        },
        register({
            commit
        }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({
                        url: 'http://localhost:8080/api/auth/signup',
                        data: user,
                        method: 'POST'
                    })
                    .then(resp => {
                        commit('auth_reg')
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        reject(err)
                    })
            })
        },
        logout({
            commit
        }) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                localStorage.removeItem('user_id')
                localStorage.removeItem('user_name')
                delete axios.defaults.headers.common['x-access-token']
                resolve()
            })
        },
        user_update({
            commit
        }, user_name) {
            commit('user_update', user_name)
            localStorage.user_name = user_name
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        username: state => state.user_name
    },
    setters: {

    }
})