import { Action } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as usuariosActions from '../../store/actions'

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit {
  usuarios: Usuario[] = []
  loading:boolean
  error:boolean

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select('usuarios').subscribe(usuarios => {
      this.usuarios = usuarios.users
      this.loading = usuarios.loading
      this.error = usuarios.error
    })

    this.store.dispatch(new usuariosActions.CargarUsuarios());
  }

}
