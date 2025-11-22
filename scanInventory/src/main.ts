import {
  bootstrapApplication,
  provideNativeScriptHttpClient,
  provideNativeScriptRouter,
  runNativeScriptAngularApp,
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from '@nativescript/angular';
import { provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import '@angular/compiler';

runNativeScriptAngularApp({
  appModuleBootstrap: () => {
    return bootstrapApplication(AppComponent, {
      providers: [
        provideNativeScriptHttpClient(withInterceptorsFromDi()),
        provideNativeScriptRouter(routes),
        provideZonelessChangeDetection(),
        importProvidersFrom(NativeScriptCommonModule, NativeScriptFormsModule),
      ],
    });
  },
});
