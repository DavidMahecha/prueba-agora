export enum EstadoProducto {
  Activo = 1,
  Inactivo = 2,
}

export class Product {
  constructor(
    idProducto = 0,
    codigoProducto = '',
    eanproducto = '',
    nombre = '',
    precio = 0,
    codigoEstado = EstadoProducto.Activo,
    nombreEstado = '',
  ) {
    this.idProducto = idProducto
    this.codigoProducto = codigoProducto
    this.eanproducto = eanproducto
    this.nombre = nombre
    this.precio = precio
    this.codigoEstado = codigoEstado
    this.nombreEstado = nombreEstado
  }

  idProducto: number;
  codigoProducto: string;
  eanproducto: string;
  nombre: string;
  precio: number;
  codigoEstado: EstadoProducto;
  nombreEstado: string;
}
