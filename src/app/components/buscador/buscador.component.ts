import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ExperienciaService } from '../../services/experiencia.service';
import { User } from '../../models/user.model';
import { Experiencia } from '../../models/experiencia.model';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]

})
export class BuscadorExperienciasComponent implements OnInit {
  usuarios: User[] = []; 
  experiencias: Experiencia[] = [];
  usuarioSeleccionado: string = ''; 
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private experienciaService: ExperienciaService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.usuarios = data;
        console.log('Usuarios cargados:', data);
      },
      (error) => {
        this.errorMessage = 'Error al cargar usuarios.';
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  buscarExperiencias(): void {
    if (!this.usuarioSeleccionado) {
      this.errorMessage = 'Escoge un usuario.';
      return;
    }

    this.experienciaService.getExperiencias().subscribe(
      (data: Experiencia[]) => {
        this.experiencias = data.filter(
          (experiencia) => experiencia.owner === this.usuarioSeleccionado
        );
        console.log('Experiencias propiedad del usuario:', this.experiencias);
      },
      (error) => {
        this.errorMessage = 'Error al cargar experiencias.';
        console.error('Error al cargar experiencias:', error);
      }
    );
  }
}