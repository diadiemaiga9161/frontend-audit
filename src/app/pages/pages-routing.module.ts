import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { DefaultComponent } from './dashboards/default/default.component';
import { FilemanagerComponent } from './filemanager/filemanager.component';
import { AuditesComponent } from './audites/audites.component';
import { EchellesComponent } from './echelles/echelles.component';
import { CampagnesComponent } from './campagnes/campagnes.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GestionProfileComponent } from './gestion-profile/gestion-profile.component';
import { GestionAuditsComponent } from './gestion-audits/gestion-audits.component';
import { AuditsCoursComponent } from './audits-cours/audits-cours.component';
import { ReferentielsComponent } from './referentiels/referentiels.component';
import { StatistiquesbetaComponent } from './statistiquesbeta/statistiquesbeta.component';
import { CrossReferentielsComponent } from './cross-referentiels/cross-referentiels.component';
import { ProfilComponent } from './profil/profil.component';
import { AjouterAuditeComponent } from './ajouter-audite/ajouter-audite.component';
import { AjouterCampagneComponent } from './ajouter-campagne/ajouter-campagne.component';
import { AjouterAuditComponent } from './ajouter-audit/ajouter-audit.component';
import { AjouterReferentielsComponent } from './ajouter-referentiels/ajouter-referentiels.component';

const routes: Routes = [
  // { path: '', redirectTo: 'dashboard' },
  {
    path: "",
    component: DefaultComponent
  },
  { path: '', component: DefaultComponent },
  {path: 'profil', component: ProfilComponent},
  {path: 'ajouter-audites', component: AjouterAuditeComponent},
  {path: 'ajouter-audit', component: AjouterAuditComponent},
  {path: 'ajouter-referentiels', component: AjouterReferentielsComponent },
  {path: 'ajouter-campagne', component: AjouterCampagneComponent},
  { path: 'calendar', component: CalendarComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'crossreferentiels', component: CrossReferentielsComponent },
  { path: 'referentiels', component: ReferentielsComponent },
  { path: 'statistiques', component: StatistiquesbetaComponent },
  { path: 'audits-cours', component: AuditsCoursComponent },
  { path: 'echelles', component: EchellesComponent },
  { path: 'gestionsaudites',component: GestionAuditsComponent},
  // { path: 'campagnes', component: CampagnesComponent },
  { path: 'campagnes', component: CampagnesComponent},
  { path: 'profile' , component: GestionProfileComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'audites', component: AuditesComponent},
  { path: 'filemanager', component: FilemanagerComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
  { path: 'crypto', loadChildren: () => import('./crypto/crypto.module').then(m => m.CryptoModule) },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
  { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule) },
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
  { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule) },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
  { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
  { path: 'jobs', loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
