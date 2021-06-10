export default {
    saveUserName(context, username) {
        context.commit('saveUserName', username)
    },
    saveToken(context, token) {
        context.commit('saveToken', token)
    },
    saveUid(context, uid) {
        context.commit('saveUid', uid)
    },
    saveCartNums(context, nums) {
        context.commit('saveCartNums', nums)
    }
}