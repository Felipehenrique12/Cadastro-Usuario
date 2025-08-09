import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));



/* import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask'; // 👈 Importar

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideNgxMask() // 👈 Adicionar aqui
  ]
};
 */