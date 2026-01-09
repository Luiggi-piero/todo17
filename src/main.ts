//#region INICIAR LA APP USANDO COMPONENTES
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppStandaloneComponent } from './app/app-standalone.component';

bootstrapApplication(AppStandaloneComponent, appConfig).catch((err) =>
  console.log(err)
);
//#endregion

//#region INICIAR LA APLICACION USANDO UN MODULO
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
//#endregion
