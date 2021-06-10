import Vue from "vue"
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

// 流程  action提交
// dispatch --> actions --> mutations --> state --> render

Vue.use(Vuex)

const state = {
    username: '',
    uid: '',
    token: '',
    cartNums: ''
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})