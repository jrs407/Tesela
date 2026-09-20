import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { fakeBackendInterceptor } from './core/interceptors/fake-backend-interceptor';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    // HttpClient debe registrarse aqui para poder inyectarlo. TEMPORAL: quitar fakeBackendInterceptor con el backend real.
    provideHttpClient(withFetch(), withInterceptors([fakeBackendInterceptor])),
  ],
};
