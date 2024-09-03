import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { emailSentBarChart, monthlyEarningChart } from './data';
import { ChartType } from './dashboard.model';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { EventService } from '../../../core/services/event.service';

import { ConfigService } from '../../../core/services/config.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GestionauditesService } from 'src/app/core/services/gestionaudites/gestionaudites.service';
import { AuditeService } from 'src/app/core/services/audite/audite.service';
import { AuditService } from 'src/app/core/services/audit/audit.service';
import { RapportService } from 'src/app/core/services/rapport/rapport.service';


const URL_PHOTO: string = environment.Url_PHOTO;
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  [x: string]: any;
  modalRef?: BsModalRef;
  isVisible: string;
  id: any;
  // gestion: any;
  User: any;
  form: any;
  auditeur: any;
  gestion: any[] = [];
  nombreAudits: number = 0;
  nombreAuditesEncours: number = 0;
  nombreRapport: number = 0;
  referentiel: any;
  conformite:any;
  statutAudit:any;
  tauxConformite:any;
  dateFin:any;
  typeAudit:any;
  typeauditeur: any;
  audites: any[] = [];
  nombreAudites: number = 0;
  nombreAudit: number= 0;
  datecreation:any;
  isSuccessful = false;
  isSignUpFailed = false;
  profileImageUrl: string = ''; // Variable pour stocker le chemin de l'image de profil
  errorMessage = '';
  id_utilisateur: any;
  rapport:any[] = []; 

  emailSentBarChart: ChartType;
  monthlyEarningChart: ChartType;
  transactions: any;
  statData: any;
  config:any = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(
    private serviceUser: UserService,
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private rapportService: RapportService,
    private auditeService: AuditeService,
    private auditService: AuditService,
    private gestionauditesService: GestionauditesService,
    private modalService: BsModalService, private configService: ConfigService, private eventService: EventService
  ) {

    
    
    this.User = this.storageService.getUser();
    this.form = {
      nom: this.User.nom,
      prenom: this.User.prenom,
      telephone: this.User.telephone,
      email: this.User.email,
      genre: this.User.genre,
      roles: this.User.roles,

      // typeauditeur: this.User.typeauditeur.id,
    };
    console.log(this.User);
    
  };


  handleAuthorImageError(event: any) {
    event.target.src = 'assets/images/diadie.jpg';
  }

generateImageUrl(photoFileName: string): string {
    const baseUrl = URL_PHOTO;
    return `${URL_PHOTO}${photoFileName}`;
  }


   // goToProfilUserOrInfo pour envoyer sur la page profil apres la connexion 
   goToProfilUserOrInfo() {
    this.User = this.storageService.getUser();
    this.router.navigate(["/profil"]);
    }
  isActive: string;

  @ViewChild('content') content;
  // @ViewChild('center', { static: false }) center?: ModalDirective;

  ngOnInit() {

    // AFFICHER LA LISTE DES referentiel
    this.gestionauditesService.ListesGestionaudit().subscribe(data => {
      this.gestion = data;
      console.log(this.gestion);
    });

    this.gestionauditesService.ListesGestionaudit().subscribe(data => {
      this.gestion = data;
      this.nombreAudits = this.gestion.length;  // Compter le nombre d'audits
      console.log(this.gestion);
      console.log('Nombre de audits:', this.nombreAudits);
    });

    this.auditeService.AfficherListAudites().subscribe(data => {
      this.audites = data;
      this.nombreAudites = this.audites.length;  // Met à jour le nombre d'audites
      console.log(this.audites);
      console.log('Nombre total d\'audites:', this.nombreAudites);
    });

     // AFFICHER LA LISTE DES rapport
     this.rapportService.AfficherListRapports().subscribe(data => {
      this.rapport = data;
      this.nombreRapport = this.rapport.length;  // Met à jour le nombre d'audites
      console.log(this.rapport);
      console.log('Nombre total de rapport:', this.nombreRapport);
    });

    this.auditService.AfficherListAudit().subscribe(data => {
      this.audit = data;
      this.nombreAudit = this.audit.length;  // Nombre total d'audites
    
      // Compter le nombre d'audites avec statut 'Encour'
      this.nombreAuditEncours = this.audit.filter(audit => audit.statutAudit === 'Encour ').length;
    
      console.log(this.audit);
      console.log('Nombre total d\'audites:', this.nombreAudit);
      console.log('Nombre d\'audites en cours:', this.nombreAuditEncours);
    });
    
  
  
  
  
    /**
     * horizontal-vertical layput set
     */
    const attribute = document.body.getAttribute('data-layout');

    this.isVisible = attribute;
    const vertical = document.getElementById('layout-vertical');
    if (vertical != null) {
      vertical.setAttribute('checked', 'true');
    }
    if (attribute == 'horizontal') {
      const horizontal = document.getElementById('layout-horizontal');
      if (horizontal != null) {
        horizontal.setAttribute('checked', 'true');
      }
    }

    /**
     * Fetches the data
     */
    this.fetchData();
  }
  //  this.User = this.storageService.getUser();
  //   this.form = {
  //     nom: this.User.nom,
  //     prenom: this.User.prenom,
  //     telephone: this.User.telephone,
  //     email: this.User.email,
  //     genre: this.User.genre,
  //     adresse: this.User.adresse,
  //     typeAuditeur: this.User.typeAuditeur.id,
  //   };
  //   console.log(this.User);

  ngAfterViewInit() {
    setTimeout(() => {
     this.center?.show()
    }, 2000);
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    this.emailSentBarChart = emailSentBarChart;
    this.monthlyEarningChart = monthlyEarningChart;

    this.isActive = 'year';
    this.configService.getConfig().subscribe(data => {
      this.transactions = data.transactions;
      this.statData = data.statData;
    });
  }
  opencenterModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  weeklyreport() {
    this.isActive = 'week';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }, {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }, {
        name: 'Series C',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }];
  }

  monthlyreport() {
    this.isActive = 'month';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }, {
        name: 'Series B',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }, {
        name: 'Series C',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }];
  }

  yearlyreport() {
    this.isActive = 'year';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }, {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }, {
        name: 'Series C',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }];
  }


  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout: string) {
    this.eventService.broadcast('changeLayout', layout);
  }
}
