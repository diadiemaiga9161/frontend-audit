import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './dashboards/default/default.component';
import { AuditesComponent } from './audites/audites.component';
import { EchellesComponent } from './echelles/echelles.component';
import { CampagnesComponent } from './campagnes/campagnes.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GestionProfileComponent } from './gestion-profile/gestion-profile.component';
import { GestionAuditsComponent } from './gestion-audits/gestion-audits.component';
import { AuditsCoursComponent } from './audits-cours/audits-cours.component';
import { ReferentielsComponent } from './referentiels/referentiels.component';
import { StatistiquesbetaComponent } from './statistiquesbeta1/statistiquesbeta.component';
import { CrossReferentielsComponent } from './cross-referentiels/cross-referentiels.component';
import { ProfilComponent } from './profil/profil.component';
import { AjouterAuditeComponent } from './ajouter-audite/ajouter-audite.component';
import { AjouterCampagneComponent } from './ajouter-campagne/ajouter-campagne.component';
import { AjouterAuditComponent } from './ajouter-audit/ajouter-audit.component';
import { AjouterReferentielsComponent } from './ajouter-referentiels/ajouter-referentiels.component';
import { ApexComponent } from './chart/apex/apex.component';

const routes: Routes = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: DefaultComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'ajouter-audites', component: AjouterAuditeComponent },
  { path: 'ajouter-audit', component: AjouterAuditComponent },
  { path: 'ajouter-referentiels', component: AjouterReferentielsComponent },
  { path: 'ajouter-campagne', component: AjouterCampagneComponent },
  { path: 'crossreferentiels', component: CrossReferentielsComponent },
  { path: 'referentiels', component: ReferentielsComponent },
  { path: 'audits-cours', component: AuditsCoursComponent },
  { path: 'echelles', component: EchellesComponent },
  { path: 'gestionsaudites', component: GestionAuditsComponent },
  { path: 'campagnes', component: CampagnesComponent },
  { path: 'profile', component: GestionProfileComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'audites', component: AuditesComponent },
  { path: 'statistiques', component: ApexComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
