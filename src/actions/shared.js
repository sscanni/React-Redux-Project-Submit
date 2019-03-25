import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { setLoadFlag} from '../actions/loadFlag'
import { showLoading, hideLoading } from 'react-redux-loading'

//const AUTHED_ID = 'tylermcginnis'
//const AUTHED_ID = 'johndoe'
//const AUTHED_ID = 'sarahedo'
const AUTHED_ID = null

const loadFlag = true

// This uses the redux Thunk pattern
export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(setLoadFlag(loadFlag))
                dispatch(hideLoading())
            })
    }
}