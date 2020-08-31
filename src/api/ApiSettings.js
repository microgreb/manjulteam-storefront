import axios from 'axios'
import store from '../store/store'
import env from '../../env'
import {EventBus} from "../bootstrap/EventBus";

export default {
    coreUrl: env.API_URL,
    apiUrl: env.API_URL + '/api/',

    /**
     * Http Default
     */
    http: axios.create({}),

    /**
     * Fetch Api Token from store
     */
    updateAccessToken: function () {
        this.http.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters.accessToken;
    },


    login: function (credentials) {
        credentials.client_id = env.OAUTH_CLIENT_ID;
        credentials.client_secret = env.OAUTH_CLIENT_SECRET;
        credentials.grant_type = 'password';

        return this.http.post(this.coreUrl + '/oauth/token', credentials);
    },

    /**
     * Get Api App route
     *
     * @param additional
     * @returns {string}
     */
    apiRoute: function (additional) {

        this.updateAccessToken();

        return this.apiUrl + additional
    },

    get: function (route, params = {}) {

        store.dispatch('startGlobalLoading');

        let that = this;

        return new Promise(function (resolve, reject) {
            that.http.get(that.apiRoute(route), {params: params}).then(res => {
                store.dispatch('stopGlobalLoading');
                resolve(res);
            }).catch(e => {
                store.dispatch('stopGlobalLoading');
                console.log('Api Get Request error');
                console.log(e);
                reject(e);
            })
        });
    },


    post: function (route, data) {

        store.dispatch('startGlobalLoading');

        let that = this;

        return new Promise(function (resolve, reject) {
            that.http.post(that.apiRoute(route), data).then(res => {
                store.dispatch('stopGlobalLoading');
                EventBus.$emit(route + '-created', res.data);

                resolve(res);
            }).catch(e => {
                store.dispatch('stopGlobalLoading');
                console.log('Api POST Request error');
                console.log(e);
                reject(e);
            })
        });
    },

    patch: function (route, data) {

        store.dispatch('startGlobalLoading');

        let that = this;

        return new Promise(function (resolve, reject) {
            that.http.patch(that.apiRoute(route), data).then(res => {
                store.dispatch('stopGlobalLoading');
                resolve(res);
            }).catch(e => {
                store.dispatch('stopGlobalLoading');
                console.log('Api PATCH Request error');
                console.log(e);
                reject(e);
            })
        });
    },


    delete: function (route) {

        store.dispatch('startGlobalLoading');

        let that = this;

        return new Promise(function (resolve, reject) {

            that.http.delete(that.apiRoute(route)).then(res => {
                store.dispatch('stopGlobalLoading');
                resolve(res);
            }).catch(e => {
                store.dispatch('stopGlobalLoading');
                console.log('Api Delete Request error');
                console.log(e);
                reject(e);
            })
        });
    }
}
