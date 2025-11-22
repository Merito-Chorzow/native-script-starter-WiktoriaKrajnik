import { Component, OnInit, NO_ERRORS_SCHEMA} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { ProductService } from '../service/product.service';
import { confirm } from '@nativescript/core/ui/dialogs';

@Component({
  selector: 'ProductDetails',
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptFormsModule],
  templateUrl: './product-details.component.html',
  schemas: [NO_ERRORS_SCHEMA],

})

export class ProductDetailsComponent implements OnInit {
    product: any = null
    isLoading = true

    isEditing = false
    editName = ''
    editCode = ''
    editBody = ''
    editAvailable = true

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService
    ) {}

    ngOnInit(): void {
        const productId = +this.route.snapshot.params['id']
        console.log('ProductDetailsComponent loaded, id =', productId);
        this.loadProduct(productId)
    }
    loadProduct(productId: number) {
        this.isLoading = true

        this.productService.getProduct(productId).subscribe({
            next: (data) => {
                this.product = data
                this.isLoading = false
            },
            error: (err) => {
                this.isLoading = false
                alert({
                    title: 'Error',
                    message: `Failed to load product details: ${err}`,
                    okButtonText: 'OK',
                })
            },
        })
    }

    onBack() {
        this.router.navigate(['/home'])
    }

    onEdit() {
        this.isEditing = true
        this.editName = this.product.name
        this.editCode = this.product.code
        this.editBody = this.product.body
        this.editAvailable = this.product.available !== false
  }

  onSaveEdit() {
        if (!this.editName || !this.editCode) {
        alert({
            title: 'Error',
            message: 'Product name and code cannot be empty.',
            okButtonText: 'OK'
        })
        return
        }
        this.product.name = this.editName
        this.product.code = this.editCode
        this.product.body = this.editBody
        this.product.available = this.editAvailable
        this.productService.updateProduct(this.product).subscribe({
        next: () => {
            alert({
            title: 'Success',
            message: 'Product updated successfully.',
            okButtonText: 'OK'
            })
            this.isEditing = false
        },
        error: (error) => {
            alert({
            title: 'Error',
            message: 'Failed to update product: ',
            okButtonText: 'OK'
            })
        }
        })
    }
    onCancelEdit() {
        this.isEditing = false
    }

    onDelete() {

        confirm({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this product?',
            okButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result) {
                this.productService.deleteProduct(this.product.id).subscribe({
                    next: () => {
                        alert({
                            title: 'Success',
                            message: 'Product deleted successfully.',
                            okButtonText: 'OK',
                        })
                        this.router.navigate(['/home'])
                    },
                    error: (err) => {
                        alert({ 
                            title: 'Error',
                            message: `Failed to delete product: ${err}`,
                            okButtonText: 'OK',
                        })
                    }
                })
            }else {
                console.log('Delete cancelled by user.')
            }   
        })       
    }
}