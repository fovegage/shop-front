export default {
    saveUserName(state, username) {
        state.username = username;
    },
    saveToken(state, token) {
        state.token = token;
    },
    saveUid(state, uid) {
        state.uid = uid;
    },
    saveCartNums(state, nums) {
        state.cartNums = nums;
    }
}