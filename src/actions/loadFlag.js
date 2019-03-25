export const SET_LOAD_FLAG = 'SET_LOAD_FLAG'

//Tweets Action Creator
export function setLoadFlag (loadFlag) {
    return {
        type: SET_LOAD_FLAG,
        loadFlag,
    }
}