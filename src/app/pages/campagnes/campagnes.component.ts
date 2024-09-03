import { Component, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { GestionauditesService } from 'src/app/core/services/gestionaudites/gestionaudites.service';
import { RapportService } from 'src/app/core/services/rapport/rapport.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; //
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-campagnes',
  templateUrl: './campagnes.component.html',
  styleUrls: ['./campagnes.component.scss']
})
export class CampagnesComponent implements OnInit {
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
  rapport:any[] = []; 
  breadCrumbItems: Array<{}>;
  modalRef?: BsModalRef;
  config:any = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  name: any;
  rapportModal: TemplateRef<any>;
  rapportParId: any;
  constructor(
    private serviceUser: UserService,
    private storageService: StorageService,
    private rapportService: RapportService,
    // private auditesService: AuditesService,
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
    // AFFICHER LA LISTE DES referentiel
    this.rapportService.AfficherListRapports().subscribe(data => {
      this.audites = data.audites || []; // Assurez-vous que 'audites' est une clé dans la réponse
     this.rapport = data;
     console.log(this.rapport);
   });

   this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Modals', active: true }];
   }
   
   openRapportModal(id: number): void {
    this.rapportService.AfficherListRapportsid(id).subscribe(data => {
      this.rapport = data;
      // this.scrollModal(this.rapportModal); // Ouvrir le modal avec le template
    }, error => {
      console.error('Erreur lors de la récupération du rapport :', error);
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
  
    this.rapportService.AfficherListRapportsid(data.idRapport).subscribe(data => {
      this.rapportParId = data;
      // Les données du rapport sont maintenant disponibles pour le modal
      console.log(data);
    }, error => {
      console.error('Erreur lors de la récupération du rapport :', error);
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
  //  generatePDF() {
  //   const doc = new jsPDF();

  //   doc.text('Liste des Rapports', 14, 16);
  //   doc.setFontSize(12);
    
  //   const cols = ['ID', 'Titre', 'Date Début', 'Date Fin', 'Remarques'];
  //   const rows = this.rapport.map(rapport => [
  //     rapport.id,
  //     rapport.titre,
  //     rapport.datedebut,
  //     rapport.datefin,
  //     rapport.remarques
  //   ]);

  //   (doc as any).autoTable({
  //     head: [cols],
  //     body: rows,
  //     startY: 20,
  //   });

  //   doc.save('rapport.pdf');
  // }


  
  rapportid() {
    // Vérifiez que vous avez les détails du rapport disponibles
    if (!this.rapportParId) {
      console.error('Détails du rapport non disponibles.');
      return;
    }
  
    // Assurez-vous que vous avez le nom de l'utilisateur connecté
    const userName = this.getCurrentUserName(); // Méthode fictive à adapter selon votre implémentation
  
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.text('Rapport Détails', 14, 20);
  
    doc.setFontSize(12);
    doc.setTextColor(100);
  
    // Ajouter le nom de l'utilisateur
    doc.text(`Nom de l'utilisateur: ${userName}`, 14, 30);
    
  
    // Informations du rapport
    doc.text(`ID: ${this.rapportParId.id}`, 14, 40);
    doc.text(`Titre: ${this.rapportParId.titre}`, 14, 50);
    doc.text(`Date Début: ${this.rapportParId.datedebut}`, 14, 60);
    doc.text(`Date Fin: ${this.rapportParId.datefin}`, 14, 70);
    doc.text(`Remarques: ${this.rapportParId.remarques}`, 14, 80);
  
    // Optionnel : Ajouter une ligne de séparation ou des styles
    doc.setDrawColor(0, 0, 0);
    doc.line(14, 90, 196, 90); // Ligne horizontale à la position (14, 90) jusqu'à (196, 90)
  
    // Sauvegarde du PDF
    doc.save('rapport.pdf');
  }
  
 rapportid1() {
  // Vérification des détails du rapport
  if (!this.rapportParId) {
    console.error('Détails du rapport non disponibles.');
    return;
  }

  // Récupération des informations de l'utilisateur
  const user = this.storageService.getUser();
  if (!user) {
    console.error('Informations de l\'utilisateur non disponibles.');
    return;
  }

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const lineSpacing = 10; // Espacement entre les lignes
  const sectionSpacing = 15; // Espacement entre les sections
  const date = new Date().toLocaleDateString();

  // Fonction pour centrer le texte
  function centerText(text: string, y: number) {
    const textWidth = doc.getTextWidth(text);
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, y);
  }

  // Ajouter la date du jour en haut à droite
  doc.setFontSize(10);
  doc.text(`Date: ${date}`, pageWidth - margin, margin, { align: 'right' });

  // Ajouter les informations de l'utilisateur en haut à gauche
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Nom: ${user.nom}`, margin, margin + lineSpacing);
  doc.text(`Prénom: ${user.prenom}`, margin, margin + 2 * lineSpacing);
  doc.text(`Téléphone: ${user.telephone}`, margin, margin + 3 * lineSpacing);
  doc.text(`Email: ${user.email}`, margin, margin + 4 * lineSpacing);
  doc.text(`Rôle: ${this.hasEntrepriseRole() ? 'Entreprise' : 'Auditeur'}`, margin, margin + 5 * lineSpacing);

  // Ajouter une séparation
  doc.setDrawColor(0, 0, 0);
  doc.line(margin, margin + 6 * lineSpacing, pageWidth - margin, margin + 6 * lineSpacing);

  // Ajouter le titre du rapport
  doc.setFontSize(16);
  doc.setTextColor(0, 102, 204); // Couleur bleue pour le titre
  centerText('Détails du Rapport', margin + 6 * lineSpacing + sectionSpacing);

  // Informations détaillées du rapport
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0); // Couleur noire pour le texte
  centerText(`ID: ${this.rapportParId.id}`, margin + 7 * lineSpacing + sectionSpacing);
  centerText(`Titre: ${this.rapportParId.titre}`, margin + 8 * lineSpacing + sectionSpacing);
  centerText(`Date Début: ${this.rapportParId.datedebut}`, margin + 9 * lineSpacing + sectionSpacing);
  centerText(`Date Fin: ${this.rapportParId.datefin}`, margin + 10 * lineSpacing + sectionSpacing);
  centerText(`Remarques: ${this.rapportParId.remarques}`, margin + 11 * lineSpacing + sectionSpacing);
  centerText(`Subjection: ${this.rapportParId.subjection}`, margin + 12 * lineSpacing + sectionSpacing);

  // Sauvegarde du PDF
  doc.save('rapport.pdf');
}

  
  // Méthode fictive pour obtenir le nom de l'utilisateur
  getCurrentUserName(): string {
    // Remplacez cette méthode par la logique pour obtenir le nom de l'utilisateur connecté
    return 'Nom de l\'utilisateur'; // Exemple statique, à remplacer par la valeur réelle
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
