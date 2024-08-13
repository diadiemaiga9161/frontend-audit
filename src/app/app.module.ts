import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';


import { SharedModule } from './cyptolanding/shared/shared.module';

import { ExtrapagesModule } from './extrapages/extrapages.module';

import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initFirebaseBackend } from './authUtils';
import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { FakeBackendInterceptor } from './core/helpers/fake-backend';
import { ToastrModule } from 'ngx-toastr';
import { EchellesComponent } from './pages/echelles/echelles.component';
import { CampagnesComponent } from './pages/campagnes/campagnes.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { GestionProfileComponent } from './pages/gestion-profile/gestion-profile.component';
import { GestionAuditsComponent } from './pages/gestion-audits/gestion-audits.component';
import { AuditsCoursComponent } from './pages/audits-cours/audits-cours.component';
import { ReferentielsComponent } from './pages/referentiels/referentiels.component';
import { StatistiquesbetaComponent } from './pages/statistiquesbeta/statistiquesbeta.component';
import { CrossReferentielsComponent } from './pages/cross-referentiels/cross-referentiels.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { AjouterAuditeComponent } from './pages/ajouter-audite/ajouter-audite.component';
import { AjouterCampagneComponent } from './pages/ajouter-campagne/ajouter-campagne.component';
import { AjouterAuditComponent } from './pages/ajouter-audit/ajouter-audit.component';
import { AjouterReferentielsComponent } from './pages/ajouter-referentiels/ajouter-referentiels.component';

if (environment.Url_BASE === 'firebase') {
  initFirebaseBackend(environment.Url_BASE);
} else {
  // tslint:disable-next-line: no-unused-expression
  FakeBackendInterceptor;
}

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CyptolandingComponent,
    EchellesComponent,
    CampagnesComponent,
    AccueilComponent,
    GestionProfileComponent,
    GestionAuditsComponent,
    AuditsCoursComponent,
    ReferentielsComponent,
    StatistiquesbetaComponent,
    CrossReferentielsComponent,
    AjouterAuditeComponent,
    AjouterCampagneComponent,
    AjouterAuditComponent,
    AjouterReferentielsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LayoutsModule,
    AppRoutingModule,
    ExtrapagesModule,
    CarouselModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    SharedModule,
    ScrollToModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    // LoaderService,
    // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
  ],
})
export class AppModule { }
