import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects'
import * as usuarioActions from '../actions'
import { UsuarioService } from '../../services/usuario.service';
import { of, EMPTY } from 'rxjs'

@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        public usuarioService: UsuarioService
    ) { }

    cargarUsuario$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(usuarioActions.CARGAR_USUARIO),
                switchMap((actions:any) => {
                    const id = actions.id
                    return this.usuarioService.getUserById(id)
                        .pipe(
                            map(user => {
                                console.log(user)
                                return new usuarioActions.CargarUsuarioSuccess(user)
                            }),
                            catchError(error => of(new usuarioActions.CargarUsuarioFail(error)))
                        )
                })
            )
    );

}