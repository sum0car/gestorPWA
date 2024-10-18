// src/app/produto-crud/produto-crud.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndexeddbService, IProduto, IMarca } from '../indexeddb.service';

@Component({
  selector: 'app-produto-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Gerenciar Produtos</h2>
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="novoProduto.descricao" name="descricao" placeholder="Descrição do Produto" required>
      <select [(ngModel)]="novoProduto.IdMarca" name="IdMarca" required>
        <option *ngFor="let marca of marcas" [value]="marca.IdMarca">{{ marca.descricao }}</option>
      </select>
      <button type="submit">{{ editando ? 'Atualizar' : 'Adicionar' }} Produto</button>
    </form>
    <ul>
      <li *ngFor="let produto of produtos">
        {{ produto.descricao }} - Marca: {{ getMarcaDescricao(produto.IdMarca) }}
        <button (click)="editarProduto(produto)">Editar</button>
        <button (click)="deletarProduto(produto.IdProduto!)">Deletar</button>
      </li>
    </ul>
  `
})
export class ProdutoCrudComponent implements OnInit {
  produtos: IProduto[] = [];
  marcas: IMarca[] = [];
  novoProduto: IProduto = { descricao: '', IdMarca: 0 };
  editando = false;

  constructor(private dbService: IndexeddbService) {}

  ngOnInit() {
    this.carregarProdutos();
    this.carregarMarcas();
  }

  carregarProdutos() {
    this.dbService.getProdutos().then(produtos => {
      this.produtos = produtos;
    });
  }

  carregarMarcas() {
    this.dbService.getMarcas().then(marcas => {
      this.marcas = marcas;
    });
  }

  onSubmit() {
    if (this.editando) {
      this.dbService.updateProduto(this.novoProduto).then(() => {
        this.carregarProdutos();
        this.resetForm();
      });
    } else {
      this.dbService.addProduto(this.novoProduto).then(() => {
        this.carregarProdutos();
        this.resetForm();
      });
    }
  }

  editarProduto(produto: IProduto) {
    this.novoProduto = { ...produto };
    this.editando = true;
  }

  deletarProduto(id: number) {
    this.dbService.deleteProduto(id).then(() => {
      this.carregarProdutos();
    });
  }

  resetForm() {
    this.novoProduto = { descricao: '', IdMarca: 0 };
    this.editando = false;
  }

  getMarcaDescricao(idMarca: number): string {
    const marca = this.marcas.find(m => m.IdMarca === idMarca);
    return marca ? marca.descricao : 'Desconhecida';
  }
}