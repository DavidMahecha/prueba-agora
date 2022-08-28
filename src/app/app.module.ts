import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ProductFormComponent } from './components/product-form/product-form.component';

@NgModule({
  declarations: [AppComponent, ProductComponent, ProductFormComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}