import { Component, OnInit, NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'
import { Router } from '@angular/router'
import { ImageAsset } from '@nativescript/core'
import { alert } from '@nativescript/core/ui/dialogs'
import { ProductService } from '../service/product.service'
import * as camera from '@nativescript/camera'

@Component({
  selector: 'ProductAdd',
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptFormsModule],
  templateUrl: './product-add.component.html',
  schemas: [NO_ERRORS_SCHEMA],
})
export class AddProductComponent implements OnInit {
  productName = ''
  productCode = ''
  productDescription = ''
  productImage: ImageAsset | null = null
  hasPhoto = false
  isSaving = false

  constructor(
    private router: Router,
    private productService: ProductService,
    private photoDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.requestCameraPermission()
  }

  requestCameraPermission(){
    camera.requestPermissions().then(()=>{
      console.log('Camera permission granted')
    }).catch(()=>{
      alert({
        title: 'Permission denied',
        message: 'Camera permission is required to take product photos.',
        okButtonText: 'OK'
      })
    })
  }

  onTakePhoto(){
    camera.takePicture().then((imageAsset: ImageAsset) => {
      this.productImage = imageAsset
      this.hasPhoto = true
      this.photoDetector.detectChanges()
      console.log('Photo taken successfully')
    }).catch((err) => {
      alert({
        title: 'Error',
        message: `Failed to take photo: ${err}`,
        okButtonText: 'OK'
      })
    })
  }

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

    let imageString = undefined
    if (this.productImage) {
      const nativeImage: any = this.productImage as any
      imageString = nativeImage.android || nativeImage.ios || undefined
    }

    const newProduct = {
      name: this.productName,
      body: this.productDescription || 'No description',
      code: this.productCode,
      userId: 1,
      image: imageString,
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
