import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';


import { UserService } from 'src/app/core/services/user/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AuditeService } from 'src/app/core/services/audite/audite.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-audites',
  templateUrl: './audites.component.html',
  styleUrls: ['./audites.component.scss'],
})
export class AuditesComponent{
  id: any;
  type: any;
  User: any;
  auditeur: any;
  form: any;
  // gestion:any;
  gestion: any[] = []; // Stocke toutes les audites
  auditesEncours: any[] = []; // Pour stocker les audites avec statut 'encore'
  referentiel: any;
  audites:any;
  conformite:any;
  statutAudit:any;
  tauxConformite:any;
  dateFin:any;
  rapport:any[] = []; 
  breadCrumbItems: Array<{}>;
  modalRef?: BsModalRef;
  config:any = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  name: any;
  auditeModal: TemplateRef<any>;
  auditesParId: any;
  constructor(
    private serviceUser: UserService,
    private authService: AuthService,
    private auditeService: AuditeService,
    public router: Router,
    private modalService: BsModalService,
    private storageService: StorageService,  // Injection du service de stockage local

  ) {

  }

  ngOnInit() {
        // AFFICHER LA LISTE DES audites
      this.serviceUser.listeAudites().subscribe(data => {
        this.type = data;
        console.log(this.audites);
      });

    
      // AFFICHER LA LISTE DES audites
 this.auditeService.AfficherListAudites().subscribe(data => {
  this.audites = data;
  console.log(this.audites);
});
   //      //AFFICHER UN INFORMATICIEN EN FONCTION DE SON ID
    // this.serviceUser.AfficherUserParId(this.id).subscribe(data => {
    //   this.auditeur = data;
    //   this.audites = data?.audites;
    //   console.log(this.auditeur);
    // });

    //  AFFICHER UN INFORMATICIEN EN FONCTION DE SON ID
    //  this.serviceUser.AfficherUserParId(this.id).subscribe(data => {
    //   this.audites = data;
    //   console.log(this.auditeur);
    // });
  }
  // scrollModal(template: TemplateRef<any>, data: any) {
  //   // Ouvrir le modal avec le template passé en paramètre
  //   this.modalRef = this.modalService.show(template, this.config);
  
  //   // Utiliser les données pour récupérer le rapport
  //   console.log(data);
  
  //   this.auditeService.AfficherListAuditesid(data.idAudites).subscribe(data => {
  //     this.auditesParId = data;
  //     // Les données du rapport sont maintenant disponibles pour le modal
  //     console.log(data);
  //   }, error => {
  //     console.error('Erreur lors de la récupération du rapport :', error);
  //   });
  // }

  scrollModal(template: TemplateRef<any>, data: any) {
    // Ouvrir le modal avec le template passé en paramètre
    this.modalRef = this.modalService.show(template, this.config);
  
    // Utiliser les données pour récupérer le rapport
    console.log('Données reçues:', data);
  
    // Réinitialiser `gestionParId` avant de faire l'appel au service pour éviter l'affichage d'anciennes données
    this.auditesParId = null;
  
    // Récupérer les détails de l'audit via le service
    this.auditeService.AfficherListAuditesid(data.idAudites).subscribe(
      response => {
        this.auditesParId = response[0];
        // Les données du rapport sont maintenant disponibles pour le modal
        console.log('Détails du audit:', response);
      },
      error => {
        console.error('Erreur lors de la récupération de l\'audit :', error);
        // Ajouter ici une gestion des erreurs, comme l'affichage d'un message à l'utilisateur
      }
    );
  }
  
}
