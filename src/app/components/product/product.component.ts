import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgForm } from '@angular/forms';
import { Product, EstadoProducto } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  Estados = EstadoProducto

  EstadosInfo = {
    [EstadoProducto.Activo]: {
      texto: 'Inactivar',
      color: 'danger'
    },
    [EstadoProducto.Inactivo]: {
      texto: 'Activar',
      color: 'success'
    },
  }

  constructor(
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => (this.productService.products = res),
      error: (error) => console.log(error),
    });
  }

  addProduct(form: NgForm) {
    console.log(form.value);return;
    const onSuccess = () => {
      this.getProducts();
      form.reset();
    };

    const data = {
      ...form.value,
      codigoEstado: form.value.codigoEstado ? this.Estados.Activo : this.Estados.Inactivo,
      idCategoriaProducto: 1
    }

    if (form.value.idProducto) {
      this.productService.updateProduct(data).subscribe({
        next: onSuccess,
      });
    } else {
      this.productService.createProduct(data).subscribe({
        next: onSuccess,
      });
    }
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete ir?')) {
      // this.productService.deleteProduct(id).subscribe({
      //   next: () => this.getProducts(),
      // });
    }
  }

  editProduct(product: Product) {
    this.productService.selectedProduct = { ...product };
  }

  onChangeStatus(event: Event) {
    const element = event.target as HTMLInputElement;
    
    this.productService.selectedProduct.codigoEstado = element.checked ?
      this.Estados.Activo :
      this.Estados.Inactivo;
  }
}
