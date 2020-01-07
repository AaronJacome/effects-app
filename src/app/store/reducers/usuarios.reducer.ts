import { Usuario } from '../../models/usuario.model';
import * as fromUsuarios from '../actions'

export interface UsuariosState {
    users: Usuario[],
    loaded: boolean,
    loading: boolean,
    error: any
}

const estadoInicial: UsuariosState = {
    users: [],
    loaded: false,
    loading: false,
    error: null
}

export function usuariosReducer(state = estadoInicial, action: fromUsuarios.usuariosAcciones) {
    switch (action.type) {
        case fromUsuarios.CARGAR_USUARIOS:
            return {
                ...state,
                loading: true
            }

        case fromUsuarios.CARGAR_USUARIOS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                users: [...action.usuarios],
                error:undefined
            }

        case fromUsuarios.CARGAR_USUARIOS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload,
                users: [],
            }

        default:
            return state
    }
}