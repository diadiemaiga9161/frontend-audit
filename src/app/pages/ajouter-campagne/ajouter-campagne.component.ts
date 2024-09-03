import { Component, Injectable } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AuditeService } from 'src/app/core/services/audite/audite.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { HttpHeaders } from '@angular/common/http';
import { RapportService } from 'src/app/core/services/rapport/rapport.service';



@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-ajouter-campagne',
  templateUrl: './ajouter-campagne.component.html',
  styleUrls: ['./ajouter-campagne.component.scss']
})
export class AjouterCampagneComponent { 
  User: any;
  audites: any;
  private accessToken!: string; // Variable pour stocker le jeton d'accès
  currentUser: string;

  constructor(
    private serviceUser: UserService,
    private authService: AuthService,
    private auditeService: AuditeService,
    private rapportService: RapportService,
    public router: Router,
    private storageService: StorageService,  // Injection du service de stockage local

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

  formData = {
    titre: '',
    description: '',
    remarques: '',
    subjection: '',
    datedebut: '',
    datefin: '',
    audites: ''
  };

  // form: any = {
  //   titre: '',
  //   description: '',
  //   remarques: '',
  //   subjection: '',
  //   datedebut: '',
  //   datefin: '',
  //   audites: ''
  // };

  onChange(event: any) {
    this.formData[event.target.name] = event.target.value;
    console.log(event.target.value);
  }
  
  onSubmit() {
    console.log(this.formData);
    
    this.rapportService.ajouter(this.formData)
      .subscribe(response => {
        console.log('Response:', response);
      }, error => {
        console.error('Error:', error);
      });
      // location.reload();

  }

//Methode pour afficher les information de user connecter
  ngOnInit(): void {

    this.serviceUser.AfficherInfoUserConnecte().subscribe(data => {
      this.User = data;
      console.log(this.User);
    }
    );
    this.auditeService.AfficherListAudites().subscribe(data => {
      this.audites = data;
      console.log(this.audites);
    });
  }
    

    // submitForm() {
    //   const auditData = {
    //     titre: this.form.titre,
    //     description: this.form.description,
    //     remarques: this.form.remarques,
    //     subjection: this.form.subjection,
    //     datedebut: this.form.datedebut,
    //     datefin: this.form.datefin,
    //     audites: this.form.audites
    //   };
    
    //   this.rapportService.ajouteraudites(auditData.titre, auditData.description, auditData.remarques, auditData.subjection, auditData.datedebut, auditData.datefin, auditData.audites)
    //     .subscribe(response => {
    //       console.log('Rapport ajouté avec succès', response);
    //       // Traiter la réponse ou rafraîchir la page
    //     }, error => {
    //       console.error('Erreur lors de l\'ajout du rapport', error);
    //     });
    // }
    
}
