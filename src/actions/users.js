export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ANSWER_QUESTION_USER = 'ANSWER_QUESTION_USER'
export const ADD_QUESTION_USER = 'ADD_QUESTION_USER'

//Users Action Creator
export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}
export function ansQuestUser(question) {
    return {
        type: ANSWER_QUESTION_USER,
        question,
    }
}

export function addQuestUser(question) {
    return {
        type: ADD_QUESTION_USER,
        question,
    }
}