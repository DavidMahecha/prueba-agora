import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { EstadoProducto, Product, CategoriaProducto } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  idProducto?: number;

  Estados = EstadoProducto;
  titulo: string = '';
  categorias = CategoriaProducto;

  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public bsModalRef: BsModalRef,
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    if(this.idProducto) {
      this.productService.getProduct(this.idProducto).subscribe({
        next: (res) => {
          this.productService.selectedProduct = {...res}
        },
        error: (error) => {
          alert('Ha ocurrido un error al obtener la información del producto')
        },
      });
      this.titulo = 'Editar Producto';
    } else {
      this.productService.selectedProduct = new Product;
      this.titulo = 'Crear Producto';
    }
  }

  saveProduct(form: NgForm) {

    if(form.invalid) {
      return;
    }

    const onSuccess = () => {
      this.triggerEvent();
      form.reset();
      this.bsModalRef.hide();
    };

    let data = {
      ...form.value,
    }

    if (form.value.idProducto) {
      data = {
        ...this.productService.selectedProduct,
        ...data
      };

      this.productService.updateProduct(data).subscribe({
        next: onSuccess,
      });
    } else {
      this.productService.createProduct(data).subscribe({
        next: onSuccess,
      });
    }
  }

  triggerEvent() {
    this.event.emit();
  }

}
