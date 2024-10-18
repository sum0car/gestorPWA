// src/app/app.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcaCrudComponent } from './marca-crud/marca-crud.component';
import { ProdutoCrudComponent } from './produto-crud/produto-crud.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MarcaCrudComponent, ProdutoCrudComponent],
  template: `
    <h1>Gestor PWA</h1>
    <app-marca-crud></app-marca-crud>
    <app-produto-crud></app-produto-crud>
  `
})
export class AppComponent {
  title = 'gestorpwa';
}