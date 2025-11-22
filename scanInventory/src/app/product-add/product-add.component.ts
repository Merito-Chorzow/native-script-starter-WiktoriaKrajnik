import { Component, OnInit } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'
import { Router } from '@angular/router'
import { ImageAsset } from '@nativescript/core'
import { alert } from '@nativescript/core/ui/dialogs'
import { ProductService } from '../service/product.service'

@Component({
  selector: 'ProductAdd',
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptFormsModule],
  templateUrl: './product-add.component.html',
})
export class AddProductComponent implements OnInit {
  productName = ''
  productCode = ''
  productDescription = ''
  productImage: ImageAsset | null = null
  isSaving = false

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
  }

  onTakePhoto(): void{}

  onSave() {
    console.log('onSave called - productName:', this.productName, 'productCode:', this.productCode)
    if (!this.productName || !this.productCode) {
      alert({
        title: 'Warning!',
        message: 'Product name and code are empty!',
        okButtonText: 'OK'
      })
      return
    }

    this.isSaving = true

    const newProduct = {
      name: this.productName,
      body: this.productDescription || 'No description',
      code: this.productCode,
      userId: 1,
      image: this.productImage ? this.productImage.toString() : undefined,
  }

    this.productService.addProduct(newProduct).subscribe({
      next: () => {
        alert({
          title: 'Succes',
          message: `Product added successfully!`,
          okButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/home'])
        })
      },
      error: (err) => {
        alert({
          title: 'Error',
          message: `Failed to add product: ${err}`,
          okButtonText: 'OK'
        })
        this.isSaving = false
      }
    })
  }


  onCancel() {
    this.router.navigate(['/home'])
  }
}
