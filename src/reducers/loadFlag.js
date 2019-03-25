import { SET_LOAD_FLAG  } from '../actions/loadFlag'

export default function setLoadFlag (state = null, action) {
    switch(action.type) {
        case SET_LOAD_FLAG  : 
            return action.loadFlag        
        default :
            return state
    }
}