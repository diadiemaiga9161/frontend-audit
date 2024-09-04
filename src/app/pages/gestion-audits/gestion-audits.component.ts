import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuditService } from 'src/app/core/services/audit/audit.service';
import { AuditeService } from 'src/app/core/services/audite/audite.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { GestionauditesService } from 'src/app/core/services/gestionaudites/gestionaudites.service';
import { ReferentielService } from 'src/app/core/services/referentiel/referentiel.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-gestion-audits',
  templateUrl: './gestion-audits.component.html',
  styleUrls: ['./gestion-audits.component.scss']
})
export class GestionAuditsComponent {
  @ViewChild('scrollable') scrollable: TemplateRef<any>; // Référence au template du modal
  modalRef: BsModalRef;
  gestion: any[] = [];
  id: any;
  User: any;
  form: any;
  audit:any[] = []; 
  auditModal: TemplateRef<any>;
  auditParId: any;
  gestionParId: any;
  // gestion:any;
  // gestion: any[] = []; // Stocke toutes les audites
  auditesEncours: any[] = []; // Pour stocker les audites avec statut 'encore'
  referentiel: any;
  audites:any;
  conformite:any;
  statutAudit:any;
  tauxConformite:any;
  dateFin:any;
  typeAudit:any;
    // bread crumb items
    breadCrumbItems: Array<{}>;
    // modalRef: BsModalRef;
    config:any = {
      backdrop: true,
      ignoreBackdropClick: true
    };
    name: any;
  constructor(
    private serviceUser: UserService,
    private storageService: StorageService,
    private gestionauditesService: GestionauditesService,
    private authService: AuthService,
    private auditService: AuditService,
    private modalService: BsModalService,

    private router: Router,
  ) {

    this.User = this.storageService.getUser();
    this.form = {
      nom: this.User.nom,
      prenom: this.User.prenom,
      telephone: this.User.telephone,
      email: this.User.email,
      genre: this.User.genre,
      adresse: this.User.adresse,
    };
    console.log(this.User);
    
  };
  ngOnInit(): void {

    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Modals', active: true }];

    // AFFICHER LA LISTE DES referentiel
    this.gestionauditesService.ListesGestionaudit().subscribe(data => {
     this.gestion = data;
     console.log(this.gestion);
   });

  //  openAuditModal(this.id: number): void {
  //   this.auditService.AfficherListAuditid(id).subscribe(data => {
  //     this.audit = data;
  //     // this.scrollModal(this.rapportModal); // Ouvrir le modal avec le template
  //   }, error => {
  //     console.error('Erreur lors de la récupération du rapport :', error);
  //   });
  // }

 
   this.gestionauditesService.ListesGestionaudit().subscribe(data => {
    this.gestion = data;

    // Filtrer les audites avec statut 'Encoure'
    this.auditesEncours = this.gestion.filter(audite => audite.statutAudit === 'Encoure	');
    
    console.log('Audites:', this.gestion);
    console.log('Audites en cours:', this.auditesEncours);
  });
   }
  //  scrollModal(template: TemplateRef<any>, context: any) {
  //   const id = context.idAudit; // Récupère l'ID du rapport depuis le contexte
  //   this.auditService.AfficherListAuditid(id).subscribe(
  //     (data) => {
  //       this.gestion = [data]; // Assure que 'gestion' est un tableau contenant les détails de l'audit
  //       this.modalRef = this.modalService.show(template, { class: 'modal-lg' }); // Ouvre le modal avec les données
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la récupération des données de l\'audit', error);
  //     }
  //   );
  // }
  openGestionModal(id: number): void {
    this.gestionauditesService.ListesGestionauditid(id).subscribe(data => {
      this.gestion = data;
      // this.scrollModal(this.rapportModal); // Ouvrir le modal avec le template
    }, error => {
      console.error('Erreur lors de la récupération du rapport :', error);
    });
  }

  
  scrollModal(template: TemplateRef<any>, data: any) {
    // Ouvrir le modal avec le template passé en paramètre
    this.modalRef = this.modalService.show(template, this.config);
  
    // Utiliser les données pour récupérer le rapport
    console.log('Données reçues:', data);
  
    // Réinitialiser `gestionParId` avant de faire l'appel au service pour éviter l'affichage d'anciennes données
    this.gestionParId = null;
  
    // Récupérer les détails de l'audit via le service
    this.gestionauditesService.ListesGestionauditid(data.idGestion).subscribe(
      response => {
        this.gestionParId = response[0];
        // Les données du rapport sont maintenant disponibles pour le modal
        console.log('Détails du audit:', response);
      },
      error => {
        console.error('Erreur lors de la récupération de l\'audit :', error);
        // Ajouter ici une gestion des erreurs, comme l'affichage d'un message à l'utilisateur
      }
    );
  }
  
  

  
  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

  /**
   * Open small modal
   * @param smallDataModal small modal data
   */
  fullModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
  openfirstModal(template: TemplateRef<any>) {
    if (this.modalRef) { 
      this.modalRef.hide();
    }
    this.modalRef = this.modalService.show(template);
  }

  openModal2(template: TemplateRef<any>) {
    if (this.modalRef) { 
      this.modalRef.hide();
    }
    this.modalRef = this.modalService.show(template); 
  }

  /**
   * Open extra large modal
   * @param exlargeModal extra large modal data
   */
  extraLarge(exlargeModal: any) {
    this.modalRef = this.modalService.show(exlargeModal, { class: 'modal-xl' });
  }

  /**
   * Open Large modal
   * @param largeDataModal large modal data
   */
  largeModal(largeDataModal: any) {
    this.modalRef = this.modalService.show(largeDataModal, { class: 'modal-lg' });
  }

  /**
   * Open small modal
   * @param smallDataModal small modal data
   */
  smallModal(smallDataModal: any) {
    this.modalRef = this.modalService.show(smallDataModal, { class: 'modal-sm' });
  }

  /**
  * Open center modal
  * @param centerDataModal center modal data
  */
  centerModal(centerDataModal: any) {
    this.modalRef = this.modalService.show(centerDataModal);
  }

  // /**
  //  * Open scroll modal
  //  * @param scrollDataModal scroll modal data
  //  */
  // scrollModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template, this.config);
  // }

  /**
   * Static modal
   * @param StaticDataModal modal content
   */
  StaticModal(StaticDataModal: any) {
    this.modalRef = this.modalService.show(StaticDataModal);
  }

  /**
   * Open scroll modal
   * @param toggleDataModal scroll modal data
   */
  toggleModal(staticDataModal: any) {
    this.modalRef = this.modalService.show(staticDataModal);
  }
  secondModal(toggleSecondModal: any) {
    this.modalRef = this.modalService.show(toggleSecondModal);
  }

  /**
   * Open modal
   * @param content modal content
   */
  varyingModal(template: TemplateRef<any>,name:any) {
    this.name = name
    this.modalRef = this.modalService.show(template, this.config);
  }
}
