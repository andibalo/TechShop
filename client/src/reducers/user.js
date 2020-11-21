import { GET_USER } from './actions'

export default (state = null, action) => {

    const { type, payload } = action
    switch (type) {
        case GET_USER:
            return payload
        default:
            return state
    }
}   