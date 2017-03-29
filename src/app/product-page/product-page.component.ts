import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { ProductService } from '../services/product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})

export class ProductPageComponent implements OnInit {
  products: Product[];
  title: string;
  price: string;

  constructor(private authService: AuthService, private router: Router, private productService:ProductService) {
      this.productService.getProducts()
        .subscribe(products => {
          this.products = products;
        });
   }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  addProduct(event) {
    event.preventDefault();
    var newProduct = {
      title: this.title,
      price: this.price
    }

    this.productService.addProduct(newProduct)
      .subscribe(product => {
          this.products.push(product);
          this.title = '';
          this.price = '';
          
      });
  }

  deleteProduct(id) {
    var products = this.products;

    this.productService.deleteProduct(id).subscribe(data => {
      if(data.n == 1){
        for(var i=0; i < products.length; i++){
          if(products[i]._id == id){
            products.splice(i, 1);
          }
        }
      }
    });
  }

}

