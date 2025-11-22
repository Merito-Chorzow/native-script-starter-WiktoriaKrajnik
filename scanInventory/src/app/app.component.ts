import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { PageRouterOutlet, NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';

@Component({
  selector: 'ns-app',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [PageRouterOutlet, NativeScriptCommonModule, NativeScriptFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppComponent {}
