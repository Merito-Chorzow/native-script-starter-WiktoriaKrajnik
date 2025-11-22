import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { ProductService } from "../service/product.service";

@Component({
    selector: "Home",
    standalone: true,
    templateUrl: "./home.component.html",
    imports: [NativeScriptCommonModule, NativeScriptFormsModule],
})
export class HomeComponent implements OnInit {
    products: any[] = [];
    isLoading = true;

    constructor(
        private router: Router,
        private productService: ProductService
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.productService.getProducts().subscribe({
            next: (data) => {
                this.products = data;
                this.isLoading = false;
            },
            error: (err) => {
                this.isLoading = false;
                alert({
                    title: "Error",
                    message: `Failed to load products: ${err}`,
                    okButtonText: "OK",
                });
            },
        });
    }

    onAddProduct() {
        this.router.navigate(['/product-add'])
    }
}