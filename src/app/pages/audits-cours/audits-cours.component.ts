import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuditService } from 'src/app/core/services/audit/audit.service';
import { AuditeService } from 'src/app/core/services/audite/audite.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { EventService } from 'src/app/core/services/event.service';
import { GestionauditesService } from 'src/app/core/services/gestionaudites/gestionaudites.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-audits-cours',
  templateUrl: './audits-cours.component.html',
  styleUrls: ['./audits-cours.component.scss']
})
export class AuditsCoursComponent {
  User: any;
  form: any;
  auditeur: any;
  filteredGestion:any;
  // gestion: any[] = [];
  nombreAudits: number = 0;
  nombreAuditesEncours: number = 0;
  referentiel: any;
  conformite:any;
  statutAudit:any;
  tauxConformite:any;
  dateFin:any;
  typeAudit:any;
  audite:any;
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
  transactions: any;
  statData: any;
  gestion: any[] = []; // Remplacez ceci par votre type de données réel
  // searchTerm: string = '';
  filteredAudits: any[] = [];
  searchTerm: string = '';
  config:any = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(
    private serviceUser: UserService,
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
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

  isActive: string;


  ngOnInit() {

    // // AFFICHER LA LISTE DES referentiel
    // this.gestionauditesService.ListesGestionaudit().subscribe(data => {
    //   this.gestion = data;
    //   console.log(this.gestion);
    // });

    this.gestionauditesService.ListesGestionaudit().subscribe(data => {
      this.gestion = data.filter(audit => audit.statutAudit === 'Encour ');
      console.log(this.gestion);
    });
    

    this.auditeService.AfficherListAudites().subscribe(data => {
      this.audites = data;
      this.nombreAudites = this.audites.length;  // Met à jour le nombre d'audites
      console.log(this.audites);
    });

    
    // this.auditService.AfficherListAudit().subscribe(data => {
    //   this.audit = data;
    //   this.nombreAudit = this.audit.length;  // Nombre total d'audites
    
    //   // Compter le nombre d'audites avec statut 'Encoure'
    //   this.nombreAuditEncours = this.audit.filter(audit => audit.statutAudit === 'Encoure').length;
    
    //   console.log(this.audit);
    //   console.log('Nombre total d\'audites:', this.nombreAudit);
    //   console.log('Nombre d\'audites en cours:', this.nombreAuditEncours);
    // });

    /**
     * Fetches the data
     */

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

}

