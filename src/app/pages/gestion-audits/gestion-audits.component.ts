import { Component, TemplateRef } from '@angular/core';
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
  id: any;
  User: any;
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
  typeAudit:any;
    // bread crumb items
    breadCrumbItems: Array<{}>;
    modalRef?: BsModalRef;
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

   this.gestionauditesService.ListesGestionaudit().subscribe(data => {
    this.gestion = data;

    // Filtrer les audites avec statut 'Encoure'
    this.auditesEncours = this.gestion.filter(audite => audite.statutAudit === 'Encoure	');
    
    console.log('Audites:', this.gestion);
    console.log('Audites en cours:', this.auditesEncours);
  });
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

  /**
   * Open scroll modal
   * @param scrollDataModal scroll modal data
   */
  scrollModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

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
