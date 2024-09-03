import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
export class ReferentielsComponent {

  selectedTab: string = 'profil'
  id: any;
  User: any;
  form: any;
  referentiel: any;
  audit: any;
  nombreAudit: any;
  nombreAuditEncours: any;
  constructor(
    private serviceUser: UserService,
    private storageService: StorageService,
    private referentielService: ReferentielService,
    private authService: AuthService,
    private auditService: AuditService,

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

this.auditService.AfficherListAudit().subscribe(data => {
  this.audit = data;
  this.nombreAudit = this.audit.length;  // Nombre total d'audites

  // Compter le nombre d'audites avec statut 'Encoure'
  this.nombreAuditEncours = this.audit.filter(audit => audit.statutAudit === 'Encoure').length;

  console.log(this.audit);
  console.log('Nombre total d\'audites:', this.nombreAudit);
  console.log('Nombre d\'audites en cours:', this.nombreAuditEncours);
});
}


}
