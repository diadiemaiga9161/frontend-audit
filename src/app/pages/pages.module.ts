import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LightboxModule } from 'ngx-lightbox';

import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';

// Emoji Picker
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardsModule } from './dashboards/dashboards.module';

import { EmailModule } from './email/email.module';
import { ContactsModule } from './contacts/contacts.module';
import { IconsModule } from './icons/icons.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfilComponent } from './profil/profil.component';
import { AjouterAuditComponent } from './ajouter-audit/ajouter-audit.component';
import { AjouterReferentielsComponent } from './ajouter-referentiels/ajouter-referentiels.component';
import { AjouterAuditeComponent } from './ajouter-audite/ajouter-audite.component';
import { GestionAuditsComponent } from './gestion-audits/gestion-audits.component';
import { ApexComponent } from './chart/apex/apex.component';
import { AjouterCampagneComponent } from './ajouter-campagne/ajouter-campagne.component';
import { CampagnesComponent } from './campagnes/campagnes.component';

@NgModule({
  declarations: [ProfilComponent,AjouterAuditComponent,AjouterAuditeComponent,GestionAuditsComponent,AjouterReferentielsComponent,ApexComponent,AjouterCampagneComponent,CampagnesComponent],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    DashboardsModule,
    EmailModule,
    HttpClientModule,
    UIModule,
    ContactsModule,
    IconsModule,
    WidgetModule,
    FullCalendarModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    SimplebarAngularModule,
    LightboxModule,
    PickerModule,

  ],
})
export class PagesModule { }
