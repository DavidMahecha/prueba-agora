import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  selectedProduct: Product;
  products: Product[] = [];
  readonly URL_API = 'http://190.60.208.195:9192/api';

  constructor(private http: HttpClient) {
    this.selectedProduct = new Product();
  }

  getProducts() {
    return this.http.get<Product[]>(`${this.URL_API}/Producto/ConsultarProductos`);
  }


  getProduct(idProducto: number) {
    return this.http.post<Product>(`${this.URL_API}/Producto/ObtenerProducto`, {
      idProducto
    });
  }

  createProduct(product: Product) {
    return this.http.post(`${this.URL_API}/Producto/CrearProducto`, product);
  }

  updateProduct(product: Product) {
    return this.http.post(`${this.URL_API}/Producto/ActualizarProducto`, product)
  }
}
