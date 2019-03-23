import {SET_CURRENT_USER} from '../actions/authentication.action'
import isEmpty from '../validations/isEmpty'



export default function(state , action ){
    switch(action.type) {
        case SET_CURRENT_USER://reducer que devuelve el estado con un valor true o false si es que está logueado o no, y una variable user con los datos del usuario
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default: 
            return state;
    }
}
