// src/app/indexeddb.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexeddbService {
  private db: IDBDatabase | null = null;

  constructor() {
    this.initDB();
  }

  private initDB() {
    const request = indexedDB.open('GestorPWA', 1);

    request.onerror = (event) => {
      console.error('Error opening database:', event);
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      const marcaStore = db.createObjectStore('marcas', { keyPath: 'IdMarca', autoIncrement: true });
      marcaStore.createIndex('descricao', 'descricao', { unique: false });

      const produtoStore = db.createObjectStore('produtos', { keyPath: 'IdProduto', autoIncrement: true });
      produtoStore.createIndex('descricao', 'descricao', { unique: false });
      produtoStore.createIndex('IdMarca', 'IdMarca', { unique: false });
    };
  }

  // Métodos para Marca
  addMarca(marca: IMarca): Promise<number> {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction(['marcas'], 'readwrite');
      const store = transaction?.objectStore('marcas');
      const request = store?.add(marca);

      request!.onsuccess = () => {
        resolve(request!.result as number);
      };

      request!.onerror = () => {
        reject(request!.error);
      };
    });
  }

  getMarcas(): Promise<IMarca[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction(['marcas'], 'readonly');
      const store = transaction?.objectStore('marcas');
      const request = store?.getAll();

      request!.onsuccess = () => {
        resolve(request!.result as IMarca[]);
      };

      request!.onerror = () => {
        reject(request!.error);
      };
    });
  }

  updateMarca(marca: IMarca): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction(['marcas'], 'readwrite');
      const store = transaction?.objectStore('marcas');
      const request = store?.put(marca);

      request!.onsuccess = () => {
        resolve();
      };

      request!.onerror = () => {
        reject(request!.error);
      };
    });
  }

  deleteMarca(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction(['marcas'], 'readwrite');
      const store = transaction?.objectStore('marcas');
      const request = store?.delete(id);

      request!.onsuccess = () => {
        resolve();
      };

      request!.onerror = () => {
        reject(request!.error);
      };
    });
  }

  // Métodos para Produto (similar aos métodos de Marca)
  addProduto(produto: IProduto): Promise<number> {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction(['produtos'], 'readwrite');
      const store = transaction?.objectStore('produtos');
      const request = store?.add(produto);

      request!.onsuccess = () => {
        resolve(request!.result as number);
      };

      request!.onerror = () => {
        reject(request!.error);
      };
    });
  }

  getProdutos(): Promise<IProduto[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction(['produtos'], 'readonly');
      const store = transaction?.objectStore('produtos');
      const request = store?.getAll();

      request!.onsuccess = () => {
        resolve(request!.result as IProduto[]);
      };

      request!.onerror = () => {
        reject(request!.error);
      };
    });
  }

  updateProduto(produto: IProduto): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction(['produtos'], 'readwrite');
      const store = transaction?.objectStore('produtos');
      const request = store?.put(produto);

      request!.onsuccess = () => {
        resolve();
      };

      request!.onerror = () => {
        reject(request!.error);
      };
    });
  }

  deleteProduto(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction(['produtos'], 'readwrite');
      const store = transaction?.objectStore('produtos');
      const request = store?.delete(id);

      request!.onsuccess = () => {
        resolve();
      };

      request!.onerror = () => {
        reject(request!.error);
      };
    });
  }
}

export interface IMarca {
  IdMarca?: number;
  descricao: string;
}

export interface IProduto {
  IdProduto?: number;
  descricao: string;
  IdMarca: number;
}