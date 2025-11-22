import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    onAddProduct() {
        this.router.navigate(['/product-add'])
    }
}