import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ImageAsset } from '@nativescript/core'
import { alert } from '@nativescript/core/ui/dialogs'

@Component({
  selector: 'ProductAdd',
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
  ) {}

  ngOnInit(): void {
  }

  onTakePhoto(): void{}

  onSave() {
    if (!this.productName || !this.productCode) {
      alert({
        title: 'Warning!',
        message: 'Product name and code are empty!',
        okButtonText: 'OK'
      })
      return
    }
  }

  // Wraca do listy bez zapisywania
  onCancel() {
    this.router.navigate(['/home'])
  }
}
