import Vuex from 'vuex'
import Vue from 'vue'
import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

//load Vuex
Vue.use(Vuex);

//to handle state
const state = {
    newses: [],
    employeesNewses: [],
    tasks: [],
    userId: null,
    token: null,
    didAutoLogout: false,
    employees: [],
    userPosition: null,
    horses: null,
    error: null,
    success: false
}

//export store module
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})