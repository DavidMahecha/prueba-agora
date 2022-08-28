import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductFormComponent } from 'src/app/components/product-form/product-form.component';
import { Product, EstadoProducto } from '../../models/product';

import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  bsModalRef?: BsModalRef;

  estadosInfo = {
    [EstadoProducto.Activo]: {
      texto: 'Inactivar',
      color: 'danger',
      textoEditar: 'inactivado',
      icono: 'close'
    },
    [EstadoProducto.Inactivo]: {
      texto: 'Activar',
      color: 'success',
      textoEditar: 'activado',
      icono: 'check'
    },
  }

  constructor(
    public productService: ProductService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productService.products = res
      },
      error: (error) => {
        alert('Ha ocurrido un error al obtener los productod')
      },
    });
  }

  changeStatus(product: Product) {

    const codigoEstado = product.codigoEstado === EstadoProducto.Activo ?
      EstadoProducto.Inactivo :
      EstadoProducto.Activo;

    this.productService.updateProduct({
      ...product,
      codigoEstado
    }).subscribe({
      next: () => {
        alert(`Producto ${this.estadosInfo[product.codigoEstado].textoEditar} exitosamente`)
        this.getProducts();
      },
      error: (error) => {
        alert('Ha ocurrido un error al actualizar los productos')
      },
    });;
  }

  openModal(idProducto?: number) {
    const initialState: ModalOptions = {
      initialState: {
        idProducto
      }
    };
    this.bsModalRef = this.modalService.show(ProductFormComponent, initialState);

    this.bsModalRef.content.event.subscribe(() => {
      this.getProducts();
    });
  }
}
