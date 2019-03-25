export const SET_AUTHED_USER = 'SET_AUTHED_USER'

//Tweets Action Creator
export function setAuthedUser (id) {
    return {
        type: SET_AUTHED_USER,
        id,
    }
}