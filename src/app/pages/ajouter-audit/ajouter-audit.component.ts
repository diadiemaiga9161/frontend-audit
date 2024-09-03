import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuditService } from 'src/app/core/services/audit/audit.service';
import { AuditeService } from 'src/app/core/services/audite/audite.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-ajouter-audit',
  templateUrl: './ajouter-audit.component.html',
  styleUrls: ['./ajouter-audit.component.scss']
})
export class AjouterAuditComponent {
  [x: string]: any;
  User: any;
  // typeAudit: any;
  id_typeAudit: any;
  // audites: any;
  // referentiel:any;
  tauxconformite: any;
  datedebut: any;
  datefin: any;
  conformite: any;
  echelle:any;
 
  form: any = {
    id_typeAudit: null,
    conformite: '',
    id_audites: null,
    id_echelle: null, // Vérifiez cette ligne
    langue: '',
    id_statutAudit: null, // Vérifiez cette ligne
    datedebut: '',
    datefin: '',
    referentiel: null,
    tauxconformite: '',
    version: ''
  };
  
  statutaudit: any[] = [];
  typeAudit: any[] = [];
  audites: any[] = [];
  referentiel: any[] = [];
  sites: any[] = [];  // Ajoutez cette ligne si vous avez un sélecteur pour les sites


  constructor(
    private serviceUser: UserService,
    private authService: AuthService,
    private auditeService: AuditeService,
    private auditService: AuditService,
    public router: Router,
  ) {

  }

    // Méthode pour définir le jeton d'accès
    setAccessToken(token: string) {
      this.accessToken = token;  // Affecte la valeur du jeton d'accès reçu à la variable privée accessToken
    }
  
    // Méthode pour obtenir les en-têtes avec le token JWT
    getHeaders(): HttpHeaders {
      const token = this.storageService.getUser().token;  // Obtient le jeton d'accès à partir du service de stockage local
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`  // Crée et retourne les en-têtes HTTP avec le jeton d'accès
      });
    }

  // form: any = {
  //   tauxconformite: null,
  //   datedebut: null,
  //   datefin: null,
  //   conformite: null,
  //   id_typeAudit: null,

  // };
//Methode pour afficher les information de user connecter
  ngOnInit(): void {
// user connecter
    // this.serviceUser.AfficherInfoUserConnecte().subscribe(data => {
    //   this.User = data;
    //   console.log(this.User);
    // }
    // );

    // AFFICHER LA LISTE DES echelle
    this.auditService.AfficherListechelle().subscribe(data => {
      this.echelle = data;
      console.log(this.echelle);
    });

       // AFFICHER LA LISTE DES referentiel
       this.auditService.AfficherListreferentiel().subscribe(data => {
        this.referentiel = data;
        console.log(this.referentiel);
      });
      // AFFICHER LA LISTE DES audites
      this.auditService.AfficherListAudites().subscribe(data => {
        this.audites = data;
        console.log(this.audites);
      });

        // AFFICHER LA LISTE DES status
        this.auditService.AfficherListAudites().subscribe(data => {
          this.audites = data;
          console.log(this.audites);
        });
    // pour afficher la liste des type d'audit
    this.auditService.AfficherListTypeAudit().subscribe(data => {
      this.typeAudit = data;
      console.log(this.typeAudit);
    }
    );

     // pour afficher la liste des type d'audit
     this.auditService.AfficherListAudit().subscribe(data => {
      this.audit = data;
      console.log(this.audit);
    }
    );

    // pour afficher la liste des statutaudit d'audit
    this.auditService.AfficherListstatutaudit().subscribe(data => {
      this.statutaudit = data;
      console.log(this.statutaudit);
    }
    );

    

  // AFFICHER LA LISTE DES echelle
  this.auditService.AfficherListechelle().subscribe(data => {
    this.echelle = data;
    console.log(this.echelle);
  });
}

//Methode pour ajouter un audit

// submitForm() {
//   const auditData = {
//     tauxconformite: this.form.tauxconformite,
//     conformite: this.form.conformite,
//     version: this.form.version,
//     typeAudit: { id: this.form.id_typeAudit },
//     referentiel: { id: this.form.id_referentiel },
//     audites: { id: this.form.id_audites },
//     statutAudit: { id: this.form.id_statutAudit }
//   };

//   this.auditService.AjouterAudit(auditData).subscribe(response => {
//     console.log('Audit ajouté avec succès', response);
//     location.reload();  // Recharge la page après l'ajout
//   }, error => {
//     console.error('Erreur lors de l\'ajout de l\'audit', error);
//   });
// }

// onSubmit(form: NgForm) {

//     const auditData = {
//       tauxconformite: this.form.tauxconformite,
//       datedebut: this.form.datedebut,
//       langue: this.form.langue,
//       version: this.form.version,
//       datefin: this.form.datefin,
//       conformite: this.form.conformite,
//       id_typeAudit: this.form.id_typeAudit,
//       referentiel: this.form.referentiel,
//       id_audites: this.form.id_audites,
//       id_echelle: this.form.id_echelle,
//       id_statutAudit: this.form.id_statutAudit
//     };
// console.log(auditData);
// const id=1

//     this.auditService.AjouterAudit(
//       auditData.tauxconformite,
//       auditData.datedebut,
//       auditData.langue,
//       auditData.version,
//       auditData.datefin,
//       auditData.conformite,
//       auditData.referentiel,
//       auditData.id_typeAudit,
//       auditData.id_audites,
//       auditData.id_echelle,
//       auditData.id_statutAudit,
//       // id
//     ).subscribe(response => {
//       console.log('Réponse du backend:', response);
//       // Gérer la réponse ici, par exemple afficher un message de succès
//     });
//     // location.reload();

// }
onSubmit(form: NgForm) {
  const auditData = {
    tauxconformite: this.form.tauxconformite,
    datedebut: this.form.datedebut,
    langue: this.form.langue,
    version: this.form.version,
    datefin: this.form.datefin,
    conformite: this.form.conformite,
    typeAudit: this.form.id_typeAudit,
    referentiel: this.form.referentiel,
    audites: this.form.id_audites,
    echelle: this.form.id_echelle,
    statutAudit: this.form.id_statutAudit
  };

  console.log(auditData);

  this.auditService.AjouterAudit(
    auditData.tauxconformite,
    auditData.datedebut,
    auditData.datefin,
    auditData.version,
    auditData.langue,
    auditData.conformite,
    auditData.referentiel,
    auditData.typeAudit,
    auditData.audites,
    auditData.echelle,
    auditData.statutAudit
  ).subscribe(response => {
    console.log('Réponse du backend:', response);
    // Gérer la réponse ici, par exemple afficher un message de succès

    // Rediriger vers la page de gestion des audits
    this.router.navigate(['/gestionsaudites']);  // Modifier le chemin si nécessaire
  }, error => {
    console.error('Erreur lors de l\'ajout de l\'audit:', error);
    // Gérer les erreurs ici
  });
}



// submitForm(f: NgForm) {
//   if (f.valid) {
//       const auditData = {
//           tauxconformite: this.form.tauxconformite,
//           datedebut: this.form.datedebut,
//           datefin: this.form.datefin,
//           conformite: this.form.conformite,
//           typeAudit: { id: this.form.typeAudit.id },
//           referentiel: { id: this.form.referentiel.id },
//           echelle: { id: this.form.echelle.id },
//           audites: { id: this.form.audites.id },
//           statutAudit: { id: this.form.statutAudit.id }
//       };

//       this.auditService.Ajouteraudit(auditData).subscribe(
//           (response) => {
//               console.log('Audit ajouté avec succès:', response);
//               location.reload(); // ou une autre action après le succès
//           },
//           (error) => {
//               console.error('Erreur lors de l\'ajout de l\'audit:', error);
//           }
//       );
//   } else {
//       console.error('Formulaire invalide');
//   }
// }


}
