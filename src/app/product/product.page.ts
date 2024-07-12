import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, IonSelect } from '@ionic/angular';
import { ProductService } from '../services/product.service';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  products: any[] = [];
  suppliers: any[] = [];
  selectedProduct: any = null;

  @ViewChild('productName', { static: false }) productName!: IonInput;
  @ViewChild('productPrice', { static: false }) productPrice!: IonInput;
  @ViewChild('productSupplier', { static: false }) productSupplier!: IonSelect;
  @ViewChild('productPhotoUrl', { static: false }) productPhotoUrl!: IonInput;

  constructor(private productService: ProductService, private supplierService: SupplierService) {}

  ngOnInit() {
    this.loadProducts();
    this.loadSuppliers();
  }

  async loadProducts() {
    try {
      const products = await this.productService.getProducts();
      this.products = products || [];
    } catch (error) {
      console.error('Error loading products', error);
    }
  }

  async loadSuppliers() {
    try {
      const suppliers = await this.supplierService.getSuppliers();
      this.suppliers = suppliers || [];
    } catch (error) {
      console.error('Error loading suppliers', error);
    }
  }

  async addProduct(nombre: string, precio: number, idProveedor: string, fotoUrl: string) {
    try {
      await this.productService.addProduct(nombre, precio, idProveedor, fotoUrl);
      this.loadProducts();
    } catch (error) {
      console.error('Error adding product', error);
    }
  }

  async updateProduct(id: string, nombre: string, precio: number, idProveedor: string, fotoUrl: string) {
    try {
      await this.productService.updateProduct(id, nombre, precio, idProveedor, fotoUrl);
      this.loadProducts();
    } catch (error) {
      console.error('Error updating product', error);
    }
  }

  async deleteProduct(id: string) {
    try {
      await this.productService.deleteProduct(id);
      this.loadProducts();
    } catch (error) {
      console.error('Error deleting product', error);
    }
  }

  handleAddProduct() {
    const nombre = this.productName.value as string || '';
    const precio = parseFloat(this.productPrice.value as string) || 0;
    const idProveedor = this.productSupplier.value as string || '';
    const fotoUrl = this.productPhotoUrl.value as string || '';

    if (this.selectedProduct) {
      this.updateProduct(this.selectedProduct.id, nombre, precio, idProveedor, fotoUrl);
      this.selectedProduct = null;
    } else {
      this.addProduct(nombre, precio, idProveedor, fotoUrl);
    }

    this.clearForm();
  }

  handleEditProduct(product: any) {
    this.selectedProduct = product;
    this.productName.value = product.nombre;
    this.productPrice.value = product.precio;
    this.productSupplier.value = product.idProveedor;
    this.productPhotoUrl.value = product.fotoUrl;
  }

  handleDeleteProduct(id: string) {
    this.deleteProduct(id);
  }

  clearForm() {
    this.productName.value = '';
    this.productPrice.value = '';
    this.productSupplier.value = '';
    this.productPhotoUrl.value = '';
  }
}
