// src/app/marca-crud/marca-crud.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndexeddbService, IMarca } from '../indexeddb.service';

@Component({
  selector: 'app-marca-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Gerenciar Marcas</h2>
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="novaMarca.descricao" name="descricao" placeholder="Descrição da Marca" required>
      <button type="submit">{{ editando ? 'Atualizar' : 'Adicionar' }} Marca</button>
    </form>
    <ul>
      <li *ngFor="let marca of marcas">
        {{ marca.descricao }}
        <button (click)="editarMarca(marca)">Editar</button>
        <button (click)="deletarMarca(marca.IdMarca!)">Deletar</button>
      </li>
    </ul>
  `
})
export class MarcaCrudComponent implements OnInit {
  marcas: IMarca[] = [];
  novaMarca: IMarca = { descricao: '' };
  editando = false;

  constructor(private dbService: IndexeddbService) {}

  ngOnInit() {
    this.carregarMarcas();
  }

  carregarMarcas() {
    this.dbService.getMarcas().then(marcas => {
      this.marcas = marcas;
    });
  }

  onSubmit() {
    if (this.editando) {
      this.dbService.updateMarca(this.novaMarca).then(() => {
        this.carregarMarcas();
        this.resetForm();
      });
    } else {
      this.dbService.addMarca(this.novaMarca).then(() => {
        this.carregarMarcas();
        this.resetForm();
      });
    }
  }

  editarMarca(marca: IMarca) {
    this.novaMarca = { ...marca };
    this.editando = true;
  }

  deletarMarca(id: number) {
    this.dbService.deleteMarca(id).then(() => {
      this.carregarMarcas();
    });
  }

  resetForm() {
    this.novaMarca = { descricao: '' };
    this.editando = false;
  }
}