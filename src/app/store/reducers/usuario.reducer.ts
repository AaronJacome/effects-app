import { Usuario } from '../../models/usuario.model';
import * as fromUsuario from '../actions'

export interface UsuarioState {
    user: Usuario,
    loaded: boolean,
    loading: boolean,
    error: any
}

const estadoInicial: UsuarioState = {
    user: null ,
    loaded: false,
    loading: false,
    error: null
}

export function usuarioReducer(state = estadoInicial, action: fromUsuario.usuarioAcciones) {
    switch (action.type) {
        case fromUsuario.CARGAR_USUARIO:
            return {
                ...state,
                loading: true
            }

        case fromUsuario.CARGAR_USUARIO_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                user: {...action.usuario},
                error:undefined
            }

        case fromUsuario.CARGAR_USUARIO_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            }

        default:
            return state
    }
}