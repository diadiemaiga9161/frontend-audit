import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuditService } from 'src/app/core/services/audit/audit.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ReferentielService } from 'src/app/core/services/referentiel/referentiel.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-referentiels',
  templateUrl: './referentiels.component.html',
  styleUrls: ['./referentiels.component.scss']
})
export class ReferentielsComponent implements OnInit {
  [x: string]: any;

  selectedTab: string = 'profil'
  id: any;
  User: any;
  form: any;
  referentiel: any;
  audit: any;
  breadCrumbItems: Array<{}>;
  modalRef?: BsModalRef;
  config:any = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  nombreAudit: any;
  nombreAuditEncours: any;
  name: any;
  constructor(
    private serviceUser: UserService,
    private storageService: StorageService,
    private referentielService: ReferentielService,
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

  form1: any = {
    referentiel: null,
    finalite: null,
    nom: null,
    dervnierversion: null,
    langue: null,
    datecreation: null,
  };
  ngOnInit(): void {
 // AFFICHER LA LISTE DES referentiel
 this.referentielService.AfficherListReferentiel().subscribe(data => {
  this.referentiel = data;
  console.log(this.referentiel);
});

// openRapportModal(id: number): void {
//   this.rapportService.AfficherListReferentielparid(id).subscribe(data => {
//     this.rapport = data;
//     // this.scrollModal(this.rapportModal); // Ouvrir le modal avec le template
//   }, error => {
//     console.error('Erreur lors de la récupération du rapport :', error);
//   });
// }


}
openReferentielModal(id: number): void {
  this.referentielService.AfficherListReferentielparid(id).subscribe(data => {
    this.referentiel = data;
    // this.scrollModal(this.rapportModal); // Ouvrir le modal avec le template
  }, error => {
    console.error('Erreur lors de la récupération du Referentiel :', error);
  });
}



// // Méthode pour ouvrir le modal
// scrollModal(template: TemplateRef<any>) {
//   this.modalRef = this.modalService.open(template, { ariaLabelledBy: 'modal-basic-title' });
// }
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

scrollModal(template: TemplateRef<any>, data: any) {
  // Ouvrir le modal avec le template passé en paramètre
  this.modalRef = this.modalService.show(template, this.config);

  // Utiliser les données pour récupérer le rapport
  console.log(data);

  this.referentielService.AfficherListReferentielparid(data.idReferentiel).subscribe(data => {
    this.referentielParId = data;
    // Les données du referentiel sont maintenant disponibles pour le modal
    console.log(data);
  }, error => {
    console.error('Erreur lors de la récupération du referentiel :', error);
  });
}


/**
 * Open scroll modal
 * @param scrollDataModal scroll modal data
 */
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



 // Méthode pour retirer le préfixe "ROLE_"
 getRoleName(role: string): string {
  return role.replace('ROLE_', '');
}

// Méthode pour vérifier si l'utilisateur a le rôle "Entreprise"
hasEntrepriseRole(): boolean {
  return this.User?.roles.some(role => this.getRoleName(role) === 'ENTREPRISE');
}

}
