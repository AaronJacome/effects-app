import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects'
import * as usuariosActions from '../actions'
import { UsuarioService } from '../../services/usuario.service';
import { of, EMPTY } from 'rxjs'

@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        public usuarioService: UsuarioService
    ) { }

    cargarUsuarios$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(usuariosActions.CARGAR_USUARIOS),
                switchMap(() =>
                    this.usuarioService.getUsers()
                        .pipe(
                            map(users => {
                                console.log(users)
                                return new usuariosActions.CargarUsuariosSuccess(users)
                            }),
                            catchError(error => of(new usuariosActions.CargarUsuariosFail(error)))
                        )
                )
            )
    );

}