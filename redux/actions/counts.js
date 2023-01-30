import { SET_USER_NAME } from '../constants';
export function setUsername(name) {
    return {
        type: SET_USER_NAME,
        payload: name
    }
}
